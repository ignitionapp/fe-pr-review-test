import type { LoaderFunctionArgs, MetaFunction } from 'react-router';
import { useLoaderData } from 'react-router';
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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import {
  getClientById,
  getProposalsByClientId,
  mockServices,
} from '../data/mock-data';
import type { Client, Proposal } from '../types';

export const meta: MetaFunction<typeof loader> = ({ params }) => {
  const client = getClientById(params.clientId!);
  return [
    { title: client ? `${client.name} - Client Details` : 'Client Not Found' },
    {
      name: 'description',
      content: 'View client details and manage proposals',
    },
  ];
};

export function loader({ params }: LoaderFunctionArgs) {
  const client = getClientById(params.clientId!);

  if (!client) {
    throw new Response('Client not found', { status: 404 });
  }

  const proposals = getProposalsByClientId(params.clientId!);

  return {
    client,
    proposals,
    services: mockServices,
  };
}

const getStatusColor = (status: Client['status']) => {
  switch (status) {
    case 'active':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'inactive':
      return 'red';
    default:
      return 'gray';
  }
};

const getProposalStatusColor = (status: Proposal['status']) => {
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function ClientDetailPage() {
  const { client, proposals } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Container maxW='container.xl' py={8}>
      <HStack gap={4} mb={8}>
        <Button variant='ghost' size='sm' onClick={() => navigate('/clients')}>
          <ArrowLeft size={16} />
          Back to Clients
        </Button>
      </HStack>

      <Grid templateColumns='2fr 1fr' gap={8} mb={8}>
        <GridItem>
          <VStack gap={6}>
            <Box w='full'>
              <Heading size='lg'>{client.name}</Heading>
              <Text fontSize='lg' color='fg.muted'>
                {client.company}
              </Text>

              <HStack gap={4} mt={4}>
                <HStack gap={2}>
                  <Mail size={16} />
                  <Text>{client.email}</Text>
                </HStack>
                <HStack gap={2}>
                  <Phone size={16} />
                  <Text>{client.phone}</Text>
                </HStack>
              </HStack>

              <HStack gap={4} mt={4}>
                <Badge
                  colorScheme={getStatusColor(client.status)}
                  textTransform='capitalize'
                >
                  {client.status}
                </Badge>
                <Text fontSize='2xl' fontWeight='bold' color='fg'>
                  {formatCurrency(client.totalValue)}
                </Text>
              </HStack>
            </Box>
          </VStack>
        </GridItem>

        <GridItem>
          <Box p={4} borderWidth={1} borderRadius='md'>
            <Heading size='sm' mb={4}>
              Client Stats
            </Heading>
            <VStack gap={3}>
              <HStack justifyContent='space-between' w='full'>
                <Text fontSize='sm' color='fg.muted'>
                  Total Proposals
                </Text>
                <Text fontWeight='medium'>{proposals.length}</Text>
              </HStack>
              <HStack justifyContent='space-between' w='full'>
                <Text fontSize='sm' color='fg.muted'>
                  Last Updated
                </Text>
                <Text fontWeight='medium'>{formatDate(client.updatedAt)}</Text>
              </HStack>
            </VStack>
          </Box>
        </GridItem>
      </Grid>

      <Box>
        <Heading size='md' mb={4}>
          Proposals ({proposals.length})
        </Heading>
        {proposals.length > 0 ? (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Title</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Amount</Table.ColumnHeader>
                <Table.ColumnHeader>Valid Until</Table.ColumnHeader>
                <Table.ColumnHeader>Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {proposals.map((proposal: Proposal) => (
                <Table.Row key={proposal.id}>
                  <Table.Cell>
                    <VStack gap={1}>
                      <Text fontWeight='medium'>{proposal.title}</Text>
                      <Text fontSize='sm' color='fg.muted'>
                        {proposal.description}
                      </Text>
                    </VStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorScheme={getProposalStatusColor(proposal.status)}
                      textTransform='capitalize'
                    >
                      {proposal.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontWeight='medium'>
                      {formatCurrency(proposal.totalAmount)}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize='sm'>{formatDate(proposal.validUntil)}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={2}>
                      <Button size='sm' variant='outline'>
                        View
                      </Button>
                      <Button size='sm' variant='subtle'>
                        Edit
                      </Button>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        ) : (
          <Box p={8} textAlign='center'>
            <Text color='fg.muted'>No proposals found for this client.</Text>
            <Button mt={4} colorScheme='blue'>
              Create Proposal
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
