import { http, HttpResponse, delay } from 'msw';
import {
  mockClients,
  mockProposals,
  mockServices,
  mockClientStats,
  mockProposalStats,
} from '../../data/mock-data';
import type { Client, Proposal, Service } from '../../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const handlers = [
  // Dashboard stats
  http.get(`${API_BASE_URL}/stats`, async () => {
    await delay(300);
    return HttpResponse.json({
      clients: mockClientStats,
      proposals: mockProposalStats,
    });
  }),

  // Clients
  http.get(`${API_BASE_URL}/clients`, async () => {
    await delay(200);
    return HttpResponse.json(mockClients);
  }),

  http.get(`${API_BASE_URL}/clients/:id`, async ({ params }) => {
    await delay(150);
    const client = mockClients.find((c: Client) => c.id === params.id);
    if (!client) {
      return HttpResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    return HttpResponse.json(client);
  }),

  // Get proposals by client ID
  http.get(
    `${API_BASE_URL}/clients/:clientId/proposals`,
    async ({ params }) => {
      await delay(200);
      const clientProposals = mockProposals.filter(
        (p: Proposal) => p.clientId === params.clientId
      );
      return HttpResponse.json(clientProposals);
    }
  ),

  // Proposals
  http.get(`${API_BASE_URL}/proposals`, async () => {
    await delay(250);
    return HttpResponse.json(mockProposals);
  }),

  http.get(`${API_BASE_URL}/proposals/:id`, async ({ params }) => {
    await delay(150);
    const proposal = mockProposals.find((p: Proposal) => p.id === params.id);
    if (!proposal) {
      return HttpResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }
    return HttpResponse.json(proposal);
  }),

  // Services
  http.get(`${API_BASE_URL}/services`, async () => {
    await delay(100);
    return HttpResponse.json(mockServices);
  }),

  http.get(`${API_BASE_URL}/services/:id`, async ({ params }) => {
    await delay(100);
    const service = mockServices.find((s: Service) => s.id === params.id);
    if (!service) {
      return HttpResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    return HttpResponse.json(service);
  }),

  // Health check
  http.get('http://localhost:3001/health', () => {
    return HttpResponse.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
    });
  }),
];
