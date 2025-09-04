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
  { label: 'Clients', path: '/clients' },
  { label: 'Proposals', path: '/proposals' },
];

export function PageLayout({ children }: PageLayoutProps) {
  const location = useLocation();

  return (
    <Box minH='100vh' bg='bg'>
      <Box
        as='header'
        bg='bg.panel'
        borderBottomWidth='1px'
        borderBottomColor='border.emphasized'
        position='sticky'
        top={0}
        zIndex={10}
        backdropFilter='blur(8px)'
        _light={{
          bg: 'white',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}
        _dark={{
          bg: 'gray.900',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        }}
      >
        <Container maxW='container.xl' py={4}>
          <Flex align='center' gap={8}>
            <HStack gap={6}>
              {navigationItems.map((item) => (
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
            <InputGroup maxW='300px' startElement={<LuSearch />}>
              <Input
                placeholder='Search...'
                variant='subtle'
                bg='bg.muted'
                _hover={{ bg: 'bg.emphasized' }}
                _focus={{ bg: 'bg.emphasized' }}
              />
            </InputGroup>
            <ColorModeButton />
          </Flex>
        </Container>
      </Box>

      <Box as='main'>{children}</Box>
    </Box>
  );
}
