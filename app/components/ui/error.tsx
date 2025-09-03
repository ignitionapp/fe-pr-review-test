import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorDisplayProps) {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' py={8}>
      <VStack gap={4} maxW='md' textAlign='center'>
        <Box color='red.500'>
          <AlertTriangle size={48} />
        </Box>
        <Heading size='md' color='fg'>
          {title}
        </Heading>
        <Text fontSize='sm' color='fg.muted' lineHeight='relaxed'>
          {message}
        </Text>
        {onRetry && (
          <Button colorScheme='red' variant='outline' onClick={onRetry}>
            Try Again
          </Button>
        )}
      </VStack>
    </Box>
  );
}
