export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'pending';
  totalValue: number;
  createdAt: string;
  updatedAt: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Proposal {
  id: string;
  clientId: string;
  title: string;
  description: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  totalAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  validUntil: string;
  services: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'consulting' | 'implementation' | 'maintenance' | 'training';
  basePrice: number;
  currency: string;
  duration: string;
  isActive: boolean;
}

export interface ClientStats {
  totalClients: number;
  activeClients: number;
  totalRevenue: number;
  pendingProposals: number;
}

export interface ProposalStats {
  totalProposals: number;
  acceptedProposals: number;
  sentProposals: number;
  draftProposals: number;
  rejectedProposals: number;
  totalValue: number;
  acceptedValue: number;
}
