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
import type { ClientFilter } from '../../types/client';

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

export const useStats = (): UseQueryResult<
  { clients: ClientStats; proposals: ProposalStats },
  Error
> =>
  useQuery({
    queryKey: queryKeys.stats,
    queryFn: api.fetchStats,
  });

export const useClients = (
  filter?: ClientFilter
): UseQueryResult<Client[], Error> =>
  useQuery({
    queryKey: queryKeys.clients,
    queryFn: async () => {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchTerm: filter?.searchTerm,
          status: filter?.status,
          minTotalValue: filter?.minTotalValue,
        }),
      });

      const data = await response.json();

      localStorage.setItem('lastClientFilter', JSON.stringify(filter));

      return data;
    },
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
