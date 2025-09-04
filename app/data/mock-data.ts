import type { Client, Proposal, Service, ClientStats } from '../types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Industries',
    status: 'active',
    totalValue: 125000,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-08-22T14:20:00Z',
    address: {
      street: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
    },
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@innovateplus.com',
    phone: '+1 (555) 987-6543',
    company: 'InnovatePlus LLC',
    status: 'pending',
    totalValue: 75000,
    createdAt: '2024-03-08T09:15:00Z',
    updatedAt: '2024-08-20T11:45:00Z',
    address: {
      street: '456 Innovation Drive',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'USA',
    },
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@globalventures.com',
    phone: '+1 (555) 456-7890',
    company: 'Global Ventures Co.',
    status: 'active',
    totalValue: 200000,
    createdAt: '2023-11-20T16:00:00Z',
    updatedAt: '2024-08-25T08:30:00Z',
    address: {
      street: '789 Enterprise Blvd',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.r@startupfund.io',
    phone: '+1 (555) 321-0987',
    company: 'StartupFund.io',
    status: 'inactive',
    totalValue: 50000,
    createdAt: '2024-02-12T13:45:00Z',
    updatedAt: '2024-06-10T17:20:00Z',
    address: {
      street: '321 Startup Lane',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA',
    },
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'dwilson@enterprisesolutions.com',
    phone: '+1 (555) 654-3210',
    company: 'Enterprise Solutions Inc.',
    status: 'active',
    totalValue: 300000,
    createdAt: '2023-09-05T12:00:00Z',
    updatedAt: '2024-08-28T10:15:00Z',
    address: {
      street: '654 Corporate Center',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA',
    },
  },
];

export const mockServices: Service[] = [
  {
    id: 's1',
    name: 'Financial Strategy Consulting',
    description: 'Comprehensive financial planning and strategy development',
    category: 'consulting',
    basePrice: 15000,
    currency: 'USD',
    duration: '3 months',
    isActive: true,
  },
  {
    id: 's2',
    name: 'Portfolio Management System',
    description: 'Custom portfolio management software implementation',
    category: 'implementation',
    basePrice: 50000,
    currency: 'USD',
    duration: '6 months',
    isActive: true,
  },
  {
    id: 's3',
    name: 'Risk Assessment Framework',
    description: 'Enterprise risk management system setup',
    category: 'implementation',
    basePrice: 25000,
    currency: 'USD',
    duration: '4 months',
    isActive: true,
  },
  {
    id: 's4',
    name: 'Team Training Program',
    description: 'Financial software training for your team',
    category: 'training',
    basePrice: 8000,
    currency: 'USD',
    duration: '1 month',
    isActive: true,
  },
];

export const mockProposals: Proposal[] = [
  {
    id: 'p1',
    clientId: '1',
    title: 'Q4 Financial Strategy Package',
    description:
      'Comprehensive financial planning and portfolio management setup',
    status: 'accepted',
    totalAmount: 65000,
    currency: 'USD',
    createdAt: '2024-08-01T10:00:00Z',
    updatedAt: '2024-08-15T14:30:00Z',
    validUntil: '2024-09-30T23:59:59Z',
    services: ['s1', 's2'],
  },
  {
    id: 'p2',
    clientId: '2',
    title: 'Risk Management Consultation',
    description: 'Risk assessment and management framework implementation',
    status: 'sent',
    totalAmount: 25000,
    currency: 'USD',
    createdAt: '2024-08-20T09:15:00Z',
    updatedAt: '2024-08-20T09:15:00Z',
    validUntil: '2024-09-20T23:59:59Z',
    services: ['s3'],
  },
  {
    id: 'p3',
    clientId: '3',
    title: 'Enterprise Solution Package',
    description: 'Full suite implementation with training',
    status: 'draft',
    totalAmount: 83000,
    currency: 'USD',
    createdAt: '2024-08-25T11:30:00Z',
    updatedAt: '2024-08-27T16:45:00Z',
    validUntil: '2024-10-25T23:59:59Z',
    services: ['s1', 's2', 's4'],
  },
];

export const mockClientStats: ClientStats = {
  totalClients: 5,
  activeClients: 3,
  totalRevenue: 750000,
  pendingProposals: 2,
};

export const mockProposalStats = {
  totalProposals: mockProposals.length,
  acceptedProposals: mockProposals.filter(p => p.status === 'accepted').length,
  draftProposals: mockProposals.filter(p => p.status === 'draft').length,
  sentProposals: mockProposals.filter(p => p.status === 'sent').length,
  totalValue: mockProposals.reduce((sum, p) => sum + p.totalAmount, 0),
  acceptedValue: mockProposals
    .filter(p => p.status === 'accepted')
    .reduce((sum, p) => sum + p.totalAmount, 0),
};

export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

export const getProposalsByClientId = (clientId: string): Proposal[] => {
  return mockProposals.filter(proposal => proposal.clientId === clientId);
};

export const getProposalById = (id: string): Proposal | undefined => {
  return mockProposals.find(proposal => proposal.id === id);
};

export const getClientNameById = (clientId: string): string => {
  const client = getClientById(clientId);
  return client ? client.name : 'Unknown Client';
};

export const getDashboardData = () => {
  const clientStatusCounts = mockClients.reduce(
    (acc, client) => {
      acc[client.status] = (acc[client.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalClients = mockClients.length;
  const clientStatusDistribution = Object.entries(clientStatusCounts).map(
    ([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
      percentage: Math.round((count / totalClients) * 100),
    })
  );

  const proposalStatusCounts = mockProposals.reduce(
    (acc, proposal) => {
      if (!acc[proposal.status]) {
        acc[proposal.status] = { count: 0, value: 0 };
      }
      acc[proposal.status].count += 1;
      acc[proposal.status].value += proposal.totalAmount;
      return acc;
    },
    {} as Record<string, { count: number; value: number }>
  );

  const proposalStatusDistribution = Object.entries(proposalStatusCounts).map(
    ([status, data]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count: data.count,
      value: data.value,
    })
  );

  const servicePerformance = mockProposals.reduce(
    (acc, proposal) => {
      proposal.services.forEach(serviceId => {
        const service = mockServices.find(s => s.id === serviceId);
        if (service) {
          const category = service.category;
          if (!acc[category]) {
            acc[category] = { count: 0, revenue: 0 };
          }
          acc[category].count += 1;
          acc[category].revenue +=
            proposal.totalAmount / proposal.services.length;
        }
      });
      return acc;
    },
    {} as Record<string, { count: number; revenue: number }>
  );

  const serviceCategories = Object.entries(servicePerformance).map(
    ([category, data]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      count: data.count,
      revenue: Math.round(data.revenue),
    })
  );

  const recentActivity = [
    ...mockProposals.map(proposal => {
      const client = getClientById(proposal.clientId);
      const activityType =
        proposal.status === 'accepted'
          ? 'proposal_accepted'
          : proposal.status === 'sent'
            ? 'proposal_sent'
            : 'proposal_draft';
      const actionText =
        proposal.status === 'accepted'
          ? 'accepted'
          : proposal.status === 'sent'
            ? 'sent'
            : 'created';

      return {
        id: `proposal-${proposal.id}`,
        type: activityType,
        title: `${proposal.title} ${actionText}`,
        client: client?.name || 'Unknown Client',
        value: proposal.totalAmount,
        timestamp: proposal.updatedAt,
      };
    }),
    ...mockClients.slice(-2).map(client => ({
      id: `client-${client.id}`,
      type: 'client_added',
      title: 'New client onboarded',
      client: client.name,
      value: null,
      timestamp: client.createdAt,
    })),
  ].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000, proposals: 9 },
    { month: 'Feb', revenue: 52000, proposals: 10 },
    { month: 'Mar', revenue: 48000, proposals: 10 },
    { month: 'Apr', revenue: 61000, proposals: 12 },
    { month: 'May', revenue: 55000, proposals: 11 },
    { month: 'Jun', revenue: 68000, proposals: 14 },
    { month: 'Jul', revenue: 72000, proposals: 14 },
    { month: 'Aug', revenue: 78000, proposals: 16 },
  ];

  const conversionRate =
    mockProposals.length > 0
      ? Math.round(
          (mockProposals.filter(p => p.status === 'accepted').length /
            mockProposals.length) *
            100
        )
      : 0;

  return {
    monthlyRevenue,
    clientStatusDistribution,
    proposalStatusDistribution,
    serviceCategories,
    recentActivity,
    conversionRate,
  };
};
