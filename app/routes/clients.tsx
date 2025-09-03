import type { Route } from './+types/clients';
import {
  Box,
  Container,
  Heading,
  Table,
  Badge,
  Button,
  HStack,
  Text,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { useClients, useStats } from '../lib/hooks/useApi';
import { LoadingSpinner } from '../components/ui/loading';
import { ErrorDisplay } from '../components/ui/error';
import type { Client } from '../types';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Clients - FinTech Dashboard' },
    {
      name: 'description',
      content: 'Manage your client relationships and proposals',
    },
  ];
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

export default function ClientsPage() {
  // Use TanStack Query to fetch data
  const {
    data: clients,
    isLoading: clientsLoading,
    error: clientsError,
    refetch: refetchClients,
  } = useClients();
  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useStats();

  const isLoading = clientsLoading || statsLoading;
  const error = clientsError || statsError;
  const stats = statsData?.clients;

  if (isLoading) {
    return (
      <Container maxW='container.xl' py={8}>
        <LoadingSpinner message='Loading clients...' />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW='container.xl' py={8}>
        <ErrorDisplay
          title='Failed to load clients'
          message='Unable to fetch client data. Please check your connection and try again.'
          onRetry={() => {
            refetchClients();
            refetchStats();
          }}
        />
      </Container>
    );
  }

  if (!clients || !stats) {
    return null;
  }

  return (
    <Container maxW='container.xl' py={8}>
      <Box mb={8}>
        <HStack justify='space-between' align='center' mb={6}>
          <Heading size='lg'>Clients</Heading>
          <Button colorScheme='blue' size='sm'>
            Add New Client
          </Button>
        </HStack>
        <HStack gap={8} mb={8}>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color='fg'>
              {stats.totalClients}
            </Text>
            <Text fontSize='sm' color='fg.muted'>
              Total Clients
            </Text>
          </Box>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color='green.500'>
              {stats.activeClients}
            </Text>
            <Text fontSize='sm' color='fg.muted'>
              Active Clients
            </Text>
          </Box>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color='fg'>
              {formatCurrency(stats.totalRevenue)}
            </Text>
            <Text fontSize='sm' color='fg.muted'>
              Total Revenue
            </Text>
          </Box>
          <Box>
            <Text fontSize='2xl' fontWeight='bold' color='yellow.500'>
              {stats.pendingProposals}
            </Text>
            <Text fontSize='sm' color='fg.muted'>
              Pending Proposals
            </Text>
          </Box>
        </HStack>
      </Box>
      <Box
        bg='bg.surface'
        borderRadius='lg'
        borderWidth='1px'
        overflow='hidden'
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Client</Table.ColumnHeader>
              <Table.ColumnHeader>Company</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Total Value</Table.ColumnHeader>
              <Table.ColumnHeader>Last Updated</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {clients.map((client: Client) => (
              <Table.Row key={client.id}>
                <Table.Cell>
                  <Box>
                    <Link
                      asChild
                      fontWeight='medium'
                      color='blue.500'
                      _hover={{ color: 'blue.600' }}
                    >
                      <RouterLink to={`/clients/${client.id}`}>
                        {client.name}
                      </RouterLink>
                    </Link>
                    <Text fontSize='sm' color='fg.muted'>
                      {client.email}
                    </Text>
                  </Box>
                </Table.Cell>
                <Table.Cell>
                  <Text fontWeight='medium'>{client.company}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    colorScheme={getStatusColor(client.status)}
                    textTransform='capitalize'
                  >
                    {client.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text fontWeight='medium'>
                    {formatCurrency(client.totalValue)}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  <Text color='fg.muted'>{formatDate(client.updatedAt)}</Text>
                </Table.Cell>
                <Table.Cell>
                  <HStack gap={2}>
                    <Button size='xs' variant='outline'>
                      Edit
                    </Button>
                    <Button size='xs' variant='outline' colorScheme='blue'>
                      New Proposal
                    </Button>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {clients.length === 0 && (
        <Box textAlign='center' py={12}>
          <Text fontSize='lg' color='fg.muted' mb={4}>
            No clients found
          </Text>
          <Button colorScheme='blue'>Add Your First Client</Button>
        </Box>
      )}
    </Container>
  );
}
