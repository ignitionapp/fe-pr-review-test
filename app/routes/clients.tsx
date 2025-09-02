import type { Route } from './+types/clients';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export function meta(): Route.MetaDescriptors {
  return [
    { title: 'Clients' },
    { name: 'description', content: 'Manage your clients' },
  ];
}

export default function Clients() {
  return (
    <Container maxW='container.xl' py={8}>
      <VStack align='start' gap={6}>
        <Heading size='xl'>Clients</Heading>
        <Text color='fg.muted' fontSize='lg'>
          This is a dummy clients page. You can manage your client relationships
          here.
        </Text>
        <Box
          p={6}
          bg='bg.muted'
          borderRadius='md'
          borderWidth='1px'
          borderColor='border'
          w='full'
        >
          <Text>Client management features would go here, such as:</Text>
          <VStack align='start' mt={4} gap={2}>
            <Text>• Add new clients</Text>
            <Text>• View client profiles</Text>
            <Text>• Update client information</Text>
            <Text>• Track client projects</Text>
            <Text>• Manage client communications</Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
