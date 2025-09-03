import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LoadingSpinner({
  message = 'Loading...',
  size = 'md',
}: LoadingSpinnerProps) {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' py={8}>
      <VStack gap={4}>
        <Spinner size={size} color='blue.500' />
        <Text fontSize='sm' color='fg.muted'>
          {message}
        </Text>
      </VStack>
    </Box>
  );
}

interface LoadingSkeletonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export function LoadingSkeleton({ children, isLoading }: LoadingSkeletonProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return <>{children}</>;
}
