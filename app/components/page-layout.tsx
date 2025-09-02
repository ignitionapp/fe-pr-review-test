import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  Link,
  Spacer,
  Container,
} from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router';
import { ColorModeButton } from './ui/color-mode';
import { LuSearch } from 'react-icons/lu';

interface PageLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Proposals', path: '/proposals' },
  { label: 'Clients', path: '/clients' },
];

export function PageLayout({ children }: PageLayoutProps) {
  const location = useLocation();

  return (
    <Box minH='100vh' bg='bg'>
      {/* Header */}
      <Box
        as='header'
        bg='bg.surface'
        borderBottomWidth='1px'
        borderBottomColor='border'
        position='sticky'
        top={0}
        zIndex={10}
      >
        <Container maxW='container.xl' py={4}>
          <Flex align='center' gap={8}>
            {/* Navigation Links */}
            <HStack gap={6}>
              {navigationItems.map(item => (
                <Link
                  key={item.path}
                  asChild
                  fontWeight={
                    location.pathname === item.path ? 'semibold' : 'medium'
                  }
                  color={location.pathname === item.path ? 'fg' : 'fg.muted'}
                  _hover={{
                    color: 'fg',
                    textDecoration: 'none',
                  }}
                  transition='color 0.2s'
                >
                  <RouterLink to={item.path}>{item.label}</RouterLink>
                </Link>
              ))}
            </HStack>

            <Spacer />

            {/* Search Input */}
            <InputGroup maxW='300px' startElement={<LuSearch />}>
              <Input
                placeholder='Search...'
                variant='subtle'
                bg='bg.muted'
                _hover={{ bg: 'bg.emphasized' }}
                _focus={{ bg: 'bg.emphasized' }}
              />
            </InputGroup>

            {/* Dark Mode Toggle */}
            <ColorModeButton />
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box as='main'>{children}</Box>
    </Box>
  );
}
