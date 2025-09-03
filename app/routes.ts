import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('proposals', 'routes/proposals.tsx'),
  route('proposals/:proposalId', 'routes/proposals.$proposalId.tsx'),
  route('clients', 'routes/clients.tsx'),
  route('clients/:clientId', 'routes/clients.$clientId.tsx'),
] satisfies RouteConfig;
