import type { Route } from './+types/proposals';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

export function meta(): Route.MetaDescriptors {
  return [
    { title: 'Proposals' },
    { name: 'description', content: 'Manage your proposals' },
  ];
}

export default function Proposals() {
  return (
    <Container maxW='container.xl' py={8}>
      <VStack align='start' gap={6}>
        <Heading size='xl'>Proposals</Heading>
        <Text color='fg.muted' fontSize='lg'>
          This is a dummy proposals page. You can manage your proposals here.
        </Text>
        <Box
          p={6}
          bg='bg.muted'
          borderRadius='md'
          borderWidth='1px'
          borderColor='border'
          w='full'
        >
          <Text>Proposal management features would go here, such as:</Text>
          <VStack align='start' mt={4} gap={2}>
            <Text>• Create new proposals</Text>
            <Text>• View existing proposals</Text>
            <Text>• Edit proposal details</Text>
            <Text>• Track proposal status</Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
