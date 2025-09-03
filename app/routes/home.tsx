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
  Badge,
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
  Clock,
  CheckCircle,
  Send,
  UserPlus,
} from 'lucide-react';
import {
  mockClientStats,
  mockProposalStats,
  getDashboardData,
} from '../data/mock-data';

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

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'proposal_accepted':
      return <CheckCircle size={16} />;
    case 'proposal_sent':
      return <Send size={16} />;
    case 'client_added':
      return <UserPlus size={16} />;
    case 'proposal_draft':
      return <FileText size={16} />;
    default:
      return <Clock size={16} />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'proposal_accepted':
      return 'green';
    case 'proposal_sent':
      return 'blue';
    case 'client_added':
      return 'purple';
    case 'proposal_draft':
      return 'orange';
    default:
      return 'gray';
  }
};

export default function Dashboard() {
  // Load data on client side for SPA mode
  const clientStats = mockClientStats;
  const proposalStats = mockProposalStats;
  const dashboardData = getDashboardData();

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
                  {dashboardData.conversionRate}%
                </Text>
              </Box>
              <Box color='orange.500'>
                <TrendingUp size={24} />
              </Box>
            </HStack>
            <HStack gap={2}>
              {dashboardData.conversionRate >= 50 ? (
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
        <Grid templateColumns='2fr 1fr' gap={8} w='full'>
          <GridItem>
            <Box p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
              <Heading size='md' mb={6}>
                Revenue Trend (Last 8 Months)
              </Heading>
              <VStack align='stretch' gap={3}>
                {dashboardData.monthlyRevenue.map((item, _index) => (
                  <HStack key={item.month} justify='space-between'>
                    <Text fontSize='sm'>{item.month}</Text>
                    <HStack gap={2}>
                      <Box
                        height='4px'
                        width={`${(item.revenue / 90000) * 200}px`}
                        bg='blue.500'
                        borderRadius='full'
                      />
                      <Text fontSize='sm' fontWeight='medium' minW='20'>
                        {formatCurrency(item.revenue)}
                      </Text>
                    </HStack>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </GridItem>

          <GridItem>
            <Box p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
              <Heading size='md' mb={6}>
                Client Status Distribution
              </Heading>
              <VStack align='stretch' gap={4}>
                {dashboardData.clientStatusDistribution.map(item => (
                  <Box key={item.status}>
                    <HStack justify='space-between' mb={2}>
                      <Text fontSize='sm'>{item.status}</Text>
                      <Text fontSize='sm' fontWeight='medium'>
                        {item.count} ({item.percentage}%)
                      </Text>
                    </HStack>
                    <Box
                      height='8px'
                      width={`${item.percentage}%`}
                      bg={
                        item.status === 'Active'
                          ? 'green.500'
                          : item.status === 'Pending'
                            ? 'yellow.500'
                            : 'red.500'
                      }
                      borderRadius='full'
                    />
                  </Box>
                ))}
              </VStack>
            </Box>
          </GridItem>
        </Grid>
        <Grid templateColumns='1fr 1fr' gap={8} w='full'>
          <GridItem>
            <Box p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
              <Heading size='md' mb={6}>
                Service Performance
              </Heading>
              <VStack align='stretch' gap={4}>
                {dashboardData.serviceCategories.map(item => (
                  <Box key={item.category}>
                    <HStack justify='space-between' mb={2}>
                      <Badge
                        colorScheme={
                          item.category === 'Implementation'
                            ? 'green'
                            : item.category === 'Consulting'
                              ? 'blue'
                              : item.category === 'Training'
                                ? 'purple'
                                : 'orange'
                        }
                        textTransform='capitalize'
                      >
                        {item.category}
                      </Badge>
                      <Text fontSize='sm' fontWeight='medium'>
                        {formatCurrency(item.revenue)} ({item.count} projects)
                      </Text>
                    </HStack>
                    <Box
                      height='12px'
                      width={`${(item.revenue / 600000) * 100}%`}
                      bg='green.500'
                      borderRadius='full'
                      minW='20px'
                    />
                  </Box>
                ))}
              </VStack>
            </Box>
          </GridItem>

          <GridItem>
            <Box p={6} borderWidth={1} borderRadius='lg' bg='bg.surface'>
              <HStack justify='space-between' align='center' mb={6}>
                <Heading size='md'>Recent Activity</Heading>
                <Button size='sm' variant='outline'>
                  View All
                </Button>
              </HStack>
              <VStack gap={4} align='stretch'>
                {dashboardData.recentActivity.map(activity => (
                  <HStack
                    key={activity.id}
                    gap={3}
                    p={3}
                    borderRadius='md'
                    bg='bg.muted'
                  >
                    <Box color={`${getActivityColor(activity.type)}.500`}>
                      {getActivityIcon(activity.type)}
                    </Box>
                    <Box flex={1}>
                      <Text fontSize='sm' fontWeight='medium'>
                        {activity.title}
                      </Text>
                      <Text fontSize='xs' color='fg.muted'>
                        {activity.client} • {formatDate(activity.timestamp)}
                      </Text>
                    </Box>
                    {activity.value && (
                      <Text fontSize='sm' fontWeight='medium' color='green.500'>
                        {formatCurrency(activity.value)}
                      </Text>
                    )}
                  </HStack>
                ))}
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
