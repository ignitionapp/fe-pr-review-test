import type { Route } from './+types/proposals';
import {
  Box,
  Container,
  Heading,
  Table,
  Badge,
  Button,
  HStack,
  VStack,
  Text,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import {
  mockProposals,
  mockProposalStats,
  getClientNameById,
} from '../data/mock-data';
import type { Proposal } from '../types';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Proposals - FinTech Dashboard' },
    {
      name: 'description',
      content: 'Manage and track your client proposals',
    },
  ];
}

export function loader(_args: Route.LoaderArgs) {
  // In a real app, this would fetch from an API
  return {
    proposals: mockProposals,
    stats: mockProposalStats,
  };
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

const getValidityStatus = (validUntil: string) => {
  const now = new Date();
  const expiry = new Date(validUntil);
  const daysUntilExpiry = Math.ceil(
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntilExpiry < 0) {
    return { text: 'Expired', color: 'red' };
  } else if (daysUntilExpiry <= 7) {
    return { text: `Expires in ${daysUntilExpiry} days`, color: 'orange' };
  }
  return { text: formatDate(validUntil), color: 'gray' };
};

export default function ProposalsPage({ loaderData }: Route.ComponentProps) {
  const { proposals, stats } = loaderData;

  return (
    <Container maxW='container.xl' py={8}>
      <Box mb={8}>
        <HStack justify='space-between' align='center' mb={6}>
          <Heading size='lg'>Proposals</Heading>
          <Button colorScheme='blue' size='sm'>
            Create New Proposal
          </Button>
        </HStack>

        {/* Stats Overview */}
        <HStack gap={8} mb={8}>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color='fg'>
              {stats.totalProposals}
            </Text>
            <Text fontSize='sm' color='fg.muted'>
              Total Proposals
            </Text>
          </Box>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color='green.500'>
              {stats.acceptedProposals}
            </Text>
            <Text fontSize='sm' color='fg.muted'>
              Accepted
            </Text>
          </Box>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color='blue.500'>
              {stats.sentProposals}
            </Text>
            <Text fontSize='sm' color='fg.muted'>
              Sent
            </Text>
          </Box>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color='orange.500'>
              {stats.draftProposals}
            </Text>
            <Text fontSize='sm' color='fg.muted'>
              Drafts
            </Text>
          </Box>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color='fg'>
              {formatCurrency(stats.totalValue)}
            </Text>
            <Text fontSize='sm' color='fg.muted'>
              Total Value
            </Text>
          </Box>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color='green.500'>
              {formatCurrency(stats.acceptedValue)}
            </Text>
            <Text fontSize='sm' color='fg.muted'>
              Accepted Value
            </Text>
          </Box>
        </HStack>
      </Box>

      {/* Proposals Table */}
      <Box
        bg='bg.surface'
        borderRadius='lg'
        borderWidth='1px'
        overflow='hidden'
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Proposal</Table.ColumnHeader>
              <Table.ColumnHeader>Client</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Amount</Table.ColumnHeader>
              <Table.ColumnHeader>Valid Until</Table.ColumnHeader>
              <Table.ColumnHeader>Last Updated</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {proposals.map(proposal => (
              <Table.Row key={proposal.id}>
                <Table.Cell>
                  <VStack gap={1} align='start'>
                    <Link
                      asChild
                      fontWeight='medium'
                      fontSize='sm'
                      color='blue.500'
                      _hover={{ color: 'blue.600' }}
                    >
                      <RouterLink to={`/proposals/${proposal.id}`}>
                        {proposal.title}
                      </RouterLink>
                    </Link>
                    <Text fontSize='xs' color='fg.muted'>
                      {proposal.description}
                    </Text>
                  </VStack>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    asChild
                    fontWeight='medium'
                    color='blue.500'
                    _hover={{ color: 'blue.600' }}
                  >
                    <RouterLink to={`/clients/${proposal.clientId}`}>
                      {getClientNameById(proposal.clientId)}
                    </RouterLink>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    colorScheme={getStatusColor(proposal.status)}
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
                  <Text
                    fontSize='sm'
                    color={`${getValidityStatus(proposal.validUntil).color}.500`}
                  >
                    {getValidityStatus(proposal.validUntil).text}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text color='fg.muted' fontSize='sm'>
                    {formatDate(proposal.updatedAt)}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <HStack gap={2}>
                    <Button size='xs' variant='outline'>
                      View
                    </Button>
                    <Button size='xs' variant='outline'>
                      Edit
                    </Button>
                    {proposal.status === 'draft' && (
                      <Button size='xs' colorScheme='blue'>
                        Send
                      </Button>
                    )}
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {proposals.length === 0 && (
        <Box textAlign='center' py={12}>
          <Text fontSize='lg' color='fg.muted' mb={4}>
            No proposals found
          </Text>
          <Button colorScheme='blue'>Create Your First Proposal</Button>
        </Box>
      )}
    </Container>
  );
}
