import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { ChakraProvider, Box, Heading, Text, Code } from '@chakra-ui/react';
import { ColorModeProvider } from './components/ui/color-mode';
import { PageLayout } from './components/page-layout';
import { system } from './lib/theme';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ColorModeProvider>
      <ChakraProvider value={system}>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </ChakraProvider>
    </ColorModeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <ColorModeProvider>
      <ChakraProvider value={system}>
        <Box p={8} maxW='container.xl' mx='auto' mt={16}>
          <Heading size='xl' mb={4}>
            {message}
          </Heading>
          <Text mb={4} color='fg.muted'>
            {details}
          </Text>
          {stack && (
            <Box p={4} bg='bg.muted' borderRadius='md' overflow='auto'>
              <Code display='block' whiteSpace='pre'>
                {stack}
              </Code>
            </Box>
          )}
        </Box>
      </ChakraProvider>
    </ColorModeProvider>
  );
}
