import type { Route } from './+types/home';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Button,
  Link,
} from '@chakra-ui/react';
// Charts functionality will be added later
import { Link as RouterLink } from 'react-router';
import {
  TrendingUp,
  Users,
  FileText,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Send,
} from 'lucide-react';
import { useStats } from '../lib/hooks/useApi';
import { LoadingSpinner } from '../components/ui/loading';
import { ErrorDisplay } from '../components/ui/error';

export function meta(_args: Route.MetaArgs) {
  return [
    { title: 'Dashboard - FinTech Pro' },
    {
      name: 'description',
      content: 'Financial services dashboard with analytics and insights',
    },
  ];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function Dashboard() {
  // Use TanStack Query to fetch stats
  const { data: stats, isLoading, error, refetch } = useStats();

  if (isLoading) {
    return (
      <Container maxW='container.xl' py={8}>
        <LoadingSpinner message='Loading dashboard...' />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW='container.xl' py={8}>
        <ErrorDisplay
          title='Failed to load dashboard'
          message='Unable to fetch dashboard data. Please check your connection and try again.'
          onRetry={() => refetch()}
        />
      </Container>
    );
  }

  if (!stats) {
    return null;
  }

  const { clients: clientStats, proposals: proposalStats } = stats;

  return (
    <Container maxW='container.xl' py={8}>
      <VStack align='start' gap={8}>
        <Box w='full'>
          <Heading size='lg' mb={2}>
            Dashboard
          </Heading>
          <Text color='fg.muted'>
            Welcome back! Here&apos;s what&apos;s happening with your business.
          </Text>
        </Box>
        <Grid
          templateColumns='repeat(auto-fit, minmax(250px, 1fr))'
          gap={6}
          w='full'
        >
          <Box p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
            <HStack justify='space-between' mb={4}>
              <Box>
                <Text fontSize='sm' color='fg.muted'>
                  Total Revenue
                </Text>
                <Text fontSize='3xl' fontWeight='bold'>
                  {formatCurrency(clientStats.totalRevenue)}
                </Text>
              </Box>
              <Box color='green.500'>
                <DollarSign size={24} />
              </Box>
            </HStack>
            <HStack gap={2}>
              <ArrowUpRight size={16} color='green' />
              <Text fontSize='sm' color='green.500'>
                +12.5% from last month
              </Text>
            </HStack>
          </Box>

          <Box p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
            <HStack justify='space-between' mb={4}>
              <Box>
                <Text fontSize='sm' color='fg.muted'>
                  Active Clients
                </Text>
                <Text fontSize='3xl' fontWeight='bold'>
                  {clientStats.activeClients}
                </Text>
              </Box>
              <Box color='blue.500'>
                <Users size={24} />
              </Box>
            </HStack>
            <HStack gap={2}>
              <ArrowUpRight size={16} color='green' />
              <Text fontSize='sm' color='green.500'>
                +2 new this week
              </Text>
            </HStack>
          </Box>

          <Box p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
            <HStack justify='space-between' mb={4}>
              <Box>
                <Text fontSize='sm' color='fg.muted'>
                  Proposals
                </Text>
                <Text fontSize='3xl' fontWeight='bold'>
                  {proposalStats.totalProposals}
                </Text>
              </Box>
              <Box color='purple.500'>
                <FileText size={24} />
              </Box>
            </HStack>
            <HStack gap={2}>
              <Text fontSize='sm' color='fg.muted'>
                {proposalStats.acceptedProposals} accepted this month
              </Text>
            </HStack>
          </Box>

          <Box p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
            <HStack justify='space-between' mb={4}>
              <Box>
                <Text fontSize='sm' color='fg.muted'>
                  Conversion Rate
                </Text>
                <Text fontSize='3xl' fontWeight='bold'>
                  {proposalStats.totalProposals > 0
                    ? Math.round(
                        (proposalStats.acceptedProposals /
                          proposalStats.totalProposals) *
                          100
                      )
                    : 0}
                  %
                </Text>
              </Box>
              <Box color='orange.500'>
                <TrendingUp size={24} />
              </Box>
            </HStack>
            <HStack gap={2}>
              {(proposalStats.totalProposals > 0
                ? Math.round(
                    (proposalStats.acceptedProposals /
                      proposalStats.totalProposals) *
                      100
                  )
                : 0) >= 50 ? (
                <>
                  <ArrowUpRight size={16} color='green' />
                  <Text fontSize='sm' color='green.500'>
                    Strong conversion rate
                  </Text>
                </>
              ) : (
                <>
                  <ArrowDownRight size={16} color='orange' />
                  <Text fontSize='sm' color='orange.500'>
                    Room for improvement
                  </Text>
                </>
              )}
            </HStack>
          </Box>
        </Grid>
        <Grid templateColumns='1fr 1fr' gap={8} w='full'>
          <GridItem>
            <Box p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
              <Heading size='md' mb={6}>
                Proposal Breakdown
              </Heading>
              <VStack align='stretch' gap={4}>
                <HStack justify='space-between'>
                  <HStack gap={2}>
                    <CheckCircle
                      size={16}
                      color='var(--chakra-colors-green-500)'
                    />
                    <Text fontSize='sm'>Accepted</Text>
                  </HStack>
                  <Text fontSize='sm' fontWeight='medium'>
                    {proposalStats.acceptedProposals}
                  </Text>
                </HStack>
                <HStack justify='space-between'>
                  <HStack gap={2}>
                    <Send size={16} color='var(--chakra-colors-blue-500)' />
                    <Text fontSize='sm'>Sent</Text>
                  </HStack>
                  <Text fontSize='sm' fontWeight='medium'>
                    {proposalStats.sentProposals}
                  </Text>
                </HStack>
                <HStack justify='space-between'>
                  <HStack gap={2}>
                    <FileText
                      size={16}
                      color='var(--chakra-colors-orange-500)'
                    />
                    <Text fontSize='sm'>Drafts</Text>
                  </HStack>
                  <Text fontSize='sm' fontWeight='medium'>
                    {proposalStats.draftProposals}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </GridItem>
          <GridItem>
            <Box p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
              <Heading size='md' mb={6}>
                Financial Summary
              </Heading>
              <VStack align='stretch' gap={4}>
                <HStack justify='space-between'>
                  <Text fontSize='sm' color='fg.muted'>
                    Total Clients
                  </Text>
                  <Text fontSize='sm' fontWeight='medium'>
                    {clientStats.totalClients}
                  </Text>
                </HStack>
                <HStack justify='space-between'>
                  <Text fontSize='sm' color='fg.muted'>
                    Pending Proposals
                  </Text>
                  <Text fontSize='sm' fontWeight='medium'>
                    {clientStats.pendingProposals}
                  </Text>
                </HStack>
                <HStack justify='space-between'>
                  <Text fontSize='sm' color='fg.muted'>
                    Total Value
                  </Text>
                  <Text fontSize='sm' fontWeight='medium'>
                    {formatCurrency(proposalStats.totalValue)}
                  </Text>
                </HStack>
                <HStack justify='space-between'>
                  <Text fontSize='sm' color='fg.muted'>
                    Accepted Value
                  </Text>
                  <Text fontSize='sm' fontWeight='medium' color='green.500'>
                    {formatCurrency(proposalStats.acceptedValue)}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
        <Box w='full' p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
          <Heading size='md' mb={4}>
            Quick Actions
          </Heading>
          <HStack gap={4}>
            <Button colorScheme='blue' size='sm'>
              Create Proposal
            </Button>
            <Link asChild>
              <RouterLink to='/clients'>
                <Button variant='outline' size='sm'>
                  View Clients
                </Button>
              </RouterLink>
            </Link>
            <Link asChild>
              <RouterLink to='/proposals'>
                <Button variant='outline' size='sm'>
                  Manage Proposals
                </Button>
              </RouterLink>
            </Link>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
}
