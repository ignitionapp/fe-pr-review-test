# FinTech Dashboard with TanStack Query & MSW

This project has been enhanced with **TanStack Query** and **MSW (Mock Service Worker)** to provide realistic API data fetching with proper loading states, error handling, and caching - perfect for coding interviews and prototyping.

## Architecture

### Frontend (React + TanStack Query)
- **React Router v7** for routing
- **Chakra UI v3** for components
- **TanStack Query v5** for data fetching and caching
- **TypeScript** for type safety

### Backend (MSW - Mock Service Worker)
- **MSW** service worker intercepting API requests
- **Browser-based mocking** - no separate server needed
- **Artificial delays** to simulate network latency
- **TypeScript** for type safety

## Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Development
Start the React app (MSW runs automatically in the browser):
```bash
npm run dev
```

This will start:
- **React App**: http://localhost:5174
- **MSW**: Automatically intercepting API calls in the browser

### 4. API Endpoints

The mock API server provides the following endpoints:

#### Stats
- `GET /api/stats` - Dashboard statistics

#### Clients
- `GET /api/clients` - List all clients
- `GET /api/clients/:id` - Get specific client
- `GET /api/clients/:clientId/proposals` - Get proposals for a client

#### Proposals
- `GET /api/proposals` - List all proposals
- `GET /api/proposals/:id` - Get specific proposal

#### Services
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get specific service

#### Health Check
- `GET /health` - Server health status

## Key Features

### TanStack Query Integration
- ✅ **Automatic Loading States** - Loading spinners while fetching data
- ✅ **Error Handling** - Retry functionality and error displays
- ✅ **Caching** - Intelligent caching with 5-minute stale time
- ✅ **Background Refetching** - Keep data fresh automatically
- ✅ **Query Keys** - Consistent cache key management

### Mock API Features
- ✅ **Realistic Delays** - Simulated network latency (100-300ms)
- ✅ **Error Responses** - Proper 404 handling for missing resources
- ✅ **CORS Enabled** - Ready for frontend development
- ✅ **Type Safety** - Full TypeScript support

### Updated Components
- ✅ **Dashboard** - Now uses `useStats()` hook with loading/error states
- ✅ **Loading Components** - Reusable loading spinners and skeletons
- ✅ **Error Components** - User-friendly error displays with retry functionality

### Why MSW for Coding Interviews?
- ✅ **Zero Setup** - No separate server process to manage
- ✅ **Browser DevTools** - See network requests in browser dev tools
- ✅ **Self-Contained** - Everything runs in a single `npm run dev` command
- ✅ **Realistic** - Uses actual HTTP requests, not mocked functions
- ✅ **Easy Demo** - Perfect for showing during interviews
- ✅ **Production-Ready Patterns** - Same patterns work with real APIs

## Next Steps

To complete the TanStack Query integration:

1. **Update Clients Page** - Convert to use `useClients()` hook
2. **Update Client Detail Page** - Convert to use `useClient()` and `useClientProposals()` hooks  
3. **Update Proposals Page** - Convert to use `useProposals()` hook
4. **Update Proposal Detail Page** - Convert to use `useProposal()` and `useServices()` hooks

## Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Format code
npm run format
```

## Example Usage

```typescript
// In a React component
import { useStats } from '../lib/hooks/useApi';
import { LoadingSpinner } from '../components/ui/loading';
import { ErrorDisplay } from '../components/ui/error';

function Dashboard() {
  const { data: stats, isLoading, error, refetch } = useStats();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay onRetry={() => refetch()} />;
  
  return (
    <div>
      <h1>Total Revenue: ${stats.clients.totalRevenue}</h1>
    </div>
  );
}
```

This setup provides a solid foundation for building a modern, performant React application with proper data fetching patterns!
