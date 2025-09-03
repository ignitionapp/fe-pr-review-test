// Core domain types for fintech application

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
  services: string[]; // Service IDs
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'consulting' | 'implementation' | 'maintenance' | 'training';
  basePrice: number;
  currency: string;
  duration: string; // e.g., "3 months", "1 year"
  isActive: boolean;
}

export interface ClientStats {
  totalClients: number;
  activeClients: number;
  totalRevenue: number;
  pendingProposals: number;
}
