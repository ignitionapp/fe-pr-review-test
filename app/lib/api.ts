import type {
  Client,
  Proposal,
  Service,
  ClientStats,
  ProposalStats,
} from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

// Generic fetch function with error handling
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Stats API
export const fetchStats = () =>
  fetchFromAPI<{ clients: ClientStats; proposals: ProposalStats }>('/stats');

// Clients API
export const fetchClients = () => fetchFromAPI<Client[]>('/clients');

export const fetchClient = (id: string) =>
  fetchFromAPI<Client>(`/clients/${id}`);

export const fetchClientProposals = (clientId: string) =>
  fetchFromAPI<Proposal[]>(`/clients/${clientId}/proposals`);

// Proposals API
export const fetchProposals = () => fetchFromAPI<Proposal[]>('/proposals');

export const fetchProposal = (id: string) =>
  fetchFromAPI<Proposal>(`/proposals/${id}`);

// Services API
export const fetchServices = () => fetchFromAPI<Service[]>('/services');

export const fetchService = (id: string) =>
  fetchFromAPI<Service>(`/services/${id}`);
