import type { Route } from './+types/home';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export function meta(): Route.MetaDescriptors {
  return [
    { title: 'Home' },
    { name: 'description', content: 'Welcome to your application!' },
  ];
}

export default function Home() {
  return (
    <Container maxW='container.xl' py={8}>
      <VStack align='start' gap={6}>
        <Heading size='xl'>Welcome Home</Heading>
        <Text color='fg.muted' fontSize='lg'>
          This is your home page. Navigate using the menu above to explore
          different sections.
        </Text>
        <Box
          p={6}
          bg='bg.muted'
          borderRadius='md'
          borderWidth='1px'
          borderColor='border'
          w='full'
        >
          <Text mb={4}>Your application now includes:</Text>
          <VStack align='start' gap={2}>
            <Text>• A responsive navigation header with menu links</Text>
            <Text>• Search functionality (UI ready for implementation)</Text>
            <Text>• Dark mode toggle</Text>
            <Text>• Dummy pages for Proposals and Clients</Text>
            <Text>• Consistent page layout across all routes</Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
