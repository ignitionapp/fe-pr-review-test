import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import * as api from '../api';
import type {
  Client,
  Proposal,
  Service,
  ClientStats,
  ProposalStats,
} from '../../types';

// Query keys for consistent caching
export const queryKeys = {
  stats: ['stats'],
  clients: ['clients'],
  client: (id: string) => ['clients', id],
  clientProposals: (clientId: string) => ['clients', clientId, 'proposals'],
  proposals: ['proposals'],
  proposal: (id: string) => ['proposals', id],
  services: ['services'],
  service: (id: string) => ['services', id],
} as const;

// Stats hooks
export const useStats = (): UseQueryResult<
  { clients: ClientStats; proposals: ProposalStats },
  Error
> =>
  useQuery({
    queryKey: queryKeys.stats,
    queryFn: api.fetchStats,
  });

// Client hooks
export const useClients = (): UseQueryResult<Client[], Error> =>
  useQuery({
    queryKey: queryKeys.clients,
    queryFn: api.fetchClients,
  });

export const useClient = (id: string): UseQueryResult<Client, Error> =>
  useQuery({
    queryKey: queryKeys.client(id),
    queryFn: () => api.fetchClient(id),
    enabled: !!id,
  });

export const useClientProposals = (
  clientId: string
): UseQueryResult<Proposal[], Error> =>
  useQuery({
    queryKey: queryKeys.clientProposals(clientId),
    queryFn: () => api.fetchClientProposals(clientId),
    enabled: !!clientId,
  });

// Proposal hooks
export const useProposals = (): UseQueryResult<Proposal[], Error> =>
  useQuery({
    queryKey: queryKeys.proposals,
    queryFn: api.fetchProposals,
  });

export const useProposal = (id: string): UseQueryResult<Proposal, Error> =>
  useQuery({
    queryKey: queryKeys.proposal(id),
    queryFn: () => api.fetchProposal(id),
    enabled: !!id,
  });

// Service hooks
export const useServices = (): UseQueryResult<Service[], Error> =>
  useQuery({
    queryKey: queryKeys.services,
    queryFn: api.fetchServices,
  });

export const useService = (id: string): UseQueryResult<Service, Error> =>
  useQuery({
    queryKey: queryKeys.service(id),
    queryFn: () => api.fetchService(id),
    enabled: !!id,
  });
