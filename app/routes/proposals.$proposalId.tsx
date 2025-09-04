import type { Route } from './+types/proposals.$proposalId';
import {
  Box,
  Container,
  Heading,
  Text,
  HStack,
  VStack,
  Badge,
  Button,
  Grid,
  GridItem,
  Table,
  Separator,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  FileText,
  User,
  Clock,
  CheckCircle,
  Send,
  Edit,
  AlertTriangle,
} from 'lucide-react';
import { useProposal, useClient, useServices } from '../lib/hooks/useApi';
import { LoadingSpinner } from '../components/ui/loading';
import { ErrorDisplay } from '../components/ui/error';
import type { Proposal, Service } from '../types';

export function meta({ params: _params }: Route.MetaArgs) {
  return [
    { title: 'Proposal Details' },
    { name: 'description', content: 'View proposal details and manage status' },
  ];
}

const getStatusColor = (status: Proposal['status']) => {
  switch (status) {
    case 'accepted':
      return 'green';
    case 'sent':
      return 'blue';
    case 'draft':
      return 'orange';
    case 'rejected':
      return 'red';
    case 'expired':
      return 'gray';
    default:
      return 'gray';
  }
};

const getStatusIcon = (status: Proposal['status']) => {
  switch (status) {
    case 'accepted':
      return <CheckCircle size={16} />;
    case 'sent':
      return <Send size={16} />;
    case 'draft':
      return <Edit size={16} />;
    case 'rejected':
      return <AlertTriangle size={16} />;
    case 'expired':
      return <Clock size={16} />;
    default:
      return <FileText size={16} />;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getValidityStatus = (validUntil: string, status: Proposal['status']) => {
  if (status === 'expired') {
    return { text: 'Expired', color: 'red', urgent: true };
  }

  const now = new Date();
  const expiry = new Date(validUntil);
  const daysUntilExpiry = Math.ceil(
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntilExpiry < 0) {
    return { text: 'Expired', color: 'red', urgent: true };
  } else if (daysUntilExpiry <= 7) {
    return {
      text: `Expires in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? '' : 's'}`,
      color: 'orange',
      urgent: true,
    };
  }
  return {
    text: `Valid until ${formatDate(validUntil)}`,
    color: 'gray',
    urgent: false,
  };
};

const getCategoryColor = (category: Service['category']) => {
  switch (category) {
    case 'consulting':
      return 'blue';
    case 'implementation':
      return 'green';
    case 'training':
      return 'purple';
    case 'maintenance':
      return 'orange';
    default:
      return 'gray';
  }
};

export default function ProposalDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const proposalId = params.proposalId!;

  const {
    data: proposal,
    isLoading: proposalLoading,
    error: proposalError,
    refetch: refetchProposal,
  } = useProposal(proposalId);
  const {
    data: client,
    isLoading: clientLoading,
    error: clientError,
    refetch: refetchClient,
  } = useClient(proposal?.clientId || '');
  const {
    data: allServices,
    isLoading: servicesLoading,
    error: servicesError,
    refetch: refetchServices,
  } = useServices();

  const isLoading = proposalLoading || clientLoading || servicesLoading;
  const error = proposalError || clientError || servicesError;

  if (isLoading) {
    return (
      <Container maxW='container.xl' py={8}>
        <HStack gap={4} mb={8}>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => navigate('/proposals')}
          >
            <ArrowLeft size={16} />
            Back to Proposals
          </Button>
        </HStack>
        <LoadingSpinner message='Loading proposal details...' />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW='container.xl' py={8}>
        <HStack gap={4} mb={8}>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => navigate('/proposals')}
          >
            <ArrowLeft size={16} />
            Back to Proposals
          </Button>
        </HStack>
        <ErrorDisplay
          title='Failed to load proposal details'
          message='Unable to fetch proposal data. Please check your connection and try again.'
          onRetry={() => {
            refetchProposal();
            refetchClient();
            refetchServices();
          }}
        />
      </Container>
    );
  }

  if (!proposal) {
    return (
      <Container maxW='container.xl' py={8}>
        <HStack gap={4} mb={8}>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => navigate('/proposals')}
          >
            <ArrowLeft size={16} />
            Back to Proposals
          </Button>
        </HStack>
        <Box textAlign='center' py={12}>
          <Heading size='lg' mb={4}>
            Proposal Not Found
          </Heading>
          <Text color='fg.muted' mb={4}>
            The requested proposal could not be found.
          </Text>
          <Button colorScheme='blue' onClick={() => navigate('/proposals')}>
            Back to Proposals
          </Button>
        </Box>
      </Container>
    );
  }

  const services = proposal.services
    .map(serviceId => allServices?.find(s => s.id === serviceId))
    .filter(Boolean) as Service[];

  const validityStatus = getValidityStatus(
    proposal.validUntil,
    proposal.status
  );

  const getActionButtons = () => {
    switch (proposal.status) {
      case 'draft':
        return (
          <HStack gap={3}>
            <Button colorScheme='blue' size='sm'>
              <Send size={16} />
              Send Proposal
            </Button>
            <Button variant='outline' size='sm'>
              <Edit size={16} />
              Edit
            </Button>
            <Button variant='outline' size='sm' colorScheme='red'>
              Delete Draft
            </Button>
          </HStack>
        );
      case 'sent':
        return (
          <HStack gap={3}>
            <Button variant='outline' size='sm'>
              <Edit size={16} />
              Revise
            </Button>
            <Button variant='outline' size='sm'>
              Resend
            </Button>
            <Button variant='outline' size='sm' colorScheme='red'>
              Withdraw
            </Button>
          </HStack>
        );
      case 'accepted':
        return (
          <HStack gap={3}>
            <Button colorScheme='green' size='sm'>
              <CheckCircle size={16} />
              Start Project
            </Button>
            <Button variant='outline' size='sm'>
              Download Contract
            </Button>
          </HStack>
        );
      case 'rejected':
        return (
          <HStack gap={3}>
            <Button variant='outline' size='sm'>
              <Edit size={16} />
              Create Revision
            </Button>
            <Button variant='outline' size='sm'>
              Archive
            </Button>
          </HStack>
        );
      case 'expired':
        return (
          <HStack gap={3}>
            <Button colorScheme='orange' size='sm'>
              Renew Proposal
            </Button>
            <Button variant='outline' size='sm'>
              Archive
            </Button>
          </HStack>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxW='container.xl' py={8}>
      <HStack gap={4} mb={8}>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => navigate('/proposals')}
        >
          <ArrowLeft size={16} />
          Back to Proposals
        </Button>
      </HStack>

      <Grid templateColumns='2fr 1fr' gap={8} mb={8}>
        <GridItem>
          <VStack gap={6} align='start'>
            <Box w='full'>
              <HStack gap={3} mb={4}>
                {getStatusIcon(proposal.status)}
                <Heading size='lg'>{proposal.title}</Heading>
                <Badge
                  colorScheme={getStatusColor(proposal.status)}
                  textTransform='capitalize'
                >
                  {proposal.status}
                </Badge>
              </HStack>

              <Text fontSize='lg' color='fg.muted' mb={6}>
                {proposal.description}
              </Text>

              <Grid templateColumns='1fr 1fr' gap={6} mb={6}>
                <VStack align='start' gap={3}>
                  <HStack gap={2}>
                    <User size={16} />
                    <Text fontSize='sm' color='fg.muted'>
                      Client
                    </Text>
                  </HStack>
                  <Text fontWeight='medium' fontSize='lg'>
                    {client?.name || 'Unknown Client'}
                  </Text>
                  {client && (
                    <Text fontSize='sm' color='fg.muted'>
                      {client.company}
                    </Text>
                  )}
                </VStack>

                <VStack align='start' gap={3}>
                  <HStack gap={2}>
                    <DollarSign size={16} />
                    <Text fontSize='sm' color='fg.muted'>
                      Total Amount
                    </Text>
                  </HStack>
                  <Text fontWeight='bold' fontSize='3xl' color='fg'>
                    {formatCurrency(proposal.totalAmount)}
                  </Text>
                  <Text fontSize='sm' color='fg.muted'>
                    {proposal.currency}
                  </Text>
                </VStack>
              </Grid>

              <Separator mb={6} />

              <Box>
                <HStack gap={2} mb={4}>
                  <FileText size={16} />
                  <Heading size='md'>Included Services</Heading>
                </HStack>

                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Service</Table.ColumnHeader>
                      <Table.ColumnHeader>Category</Table.ColumnHeader>
                      <Table.ColumnHeader>Duration</Table.ColumnHeader>
                      <Table.ColumnHeader>Base Price</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {services.map(service => (
                      <Table.Row key={service.id}>
                        <Table.Cell>
                          <VStack gap={1} align='start'>
                            <Text fontWeight='medium'>{service.name}</Text>
                            <Text fontSize='sm' color='fg.muted'>
                              {service.description}
                            </Text>
                          </VStack>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge
                            colorScheme={getCategoryColor(service.category)}
                            textTransform='capitalize'
                          >
                            {service.category}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>
                          <Text>{service.duration}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text fontWeight='medium'>
                            {formatCurrency(service.basePrice)}
                          </Text>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Box>
            </Box>
          </VStack>
        </GridItem>

        <GridItem>
          <VStack gap={6}>
            <Box p={4} borderWidth={1} borderRadius='md' w='full'>
              <Heading size='sm' mb={4}>
                Proposal Details
              </Heading>
              <VStack gap={3}>
                <HStack justifyContent='space-between' w='full'>
                  <Text fontSize='sm' color='fg.muted'>
                    Created
                  </Text>
                  <Text fontWeight='medium' fontSize='sm'>
                    {formatDateTime(proposal.createdAt)}
                  </Text>
                </HStack>
                <HStack justifyContent='space-between' w='full'>
                  <Text fontSize='sm' color='fg.muted'>
                    Last Updated
                  </Text>
                  <Text fontWeight='medium' fontSize='sm'>
                    {formatDateTime(proposal.updatedAt)}
                  </Text>
                </HStack>
                <HStack justifyContent='space-between' w='full'>
                  <HStack gap={1}>
                    <Calendar size={12} />
                    <Text fontSize='sm' color='fg.muted'>
                      Valid Until
                    </Text>
                  </HStack>
                  <Text
                    fontWeight='medium'
                    fontSize='sm'
                    color={
                      validityStatus.urgent
                        ? `${validityStatus.color}.500`
                        : 'fg'
                    }
                  >
                    {validityStatus.text}
                  </Text>
                </HStack>
              </VStack>
            </Box>

            <Box p={4} borderWidth={1} borderRadius='md' w='full'>
              <Heading size='sm' mb={4}>
                Actions
              </Heading>
              {getActionButtons()}
            </Box>

            {client && (
              <Box p={4} borderWidth={1} borderRadius='md' w='full'>
                <Heading size='sm' mb={4}>
                  Client Information
                </Heading>
                <VStack gap={2} align='start'>
                  <Button
                    variant='plain'
                    size='sm'
                    onClick={() => navigate(`/clients/${client.id}`)}
                  >
                    View Client Profile
                  </Button>
                  <Text fontSize='sm' color='fg.muted'>
                    {client.email}
                  </Text>
                  <Text fontSize='sm' color='fg.muted'>
                    {client.phone}
                  </Text>
                  <Badge
                    colorScheme={
                      client.status === 'active'
                        ? 'green'
                        : client.status === 'pending'
                          ? 'yellow'
                          : 'red'
                    }
                    textTransform='capitalize'
                  >
                    {client.status}
                  </Badge>
                </VStack>
              </Box>
            )}
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
