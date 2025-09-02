import { Box, Button, Text, Input } from '@chakra-ui/react';
import { useState } from 'react';

export function ChakraDemo() {
  const [inputValue, setInputValue] = useState('');

  return (
    <Box p={8}>
      <Box mb={8}>
        <Text
          fontSize='2xl'
          textAlign='center'
          color='blue.600'
          fontWeight='bold'
        >
          Chakra UI v3 Demo
        </Text>
      </Box>

      <Box maxW='600px' mx='auto'>
        {/* Basic Components */}
        <Box
          mb={8}
          p={6}
          border='1px solid'
          borderColor='gray.200'
          borderRadius='lg'
        >
          <Text fontSize='lg' mb={4} fontWeight='semibold'>
            Buttons
          </Text>
          <Box display='flex' gap={4} flexWrap='wrap'>
            <Button colorScheme='blue' variant='solid'>
              Solid Button
            </Button>
            <Button colorScheme='blue' variant='outline'>
              Outline Button
            </Button>
            <Button colorScheme='green' size='sm'>
              Small Button
            </Button>
            <Button colorScheme='red' size='lg'>
              Large Button
            </Button>
          </Box>
        </Box>

        {/* Form Elements */}
        <Box
          mb={8}
          p={6}
          border='1px solid'
          borderColor='gray.200'
          borderRadius='lg'
        >
          <Text fontSize='lg' mb={4} fontWeight='semibold'>
            Form Elements
          </Text>
          <Box mb={4}>
            <Text mb={2}>Email Input:</Text>
            <Input
              placeholder='Enter your email'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </Box>
          <Text>Input value: {inputValue}</Text>
        </Box>

        {/* Color Demonstration */}
        <Box
          mb={8}
          p={6}
          border='1px solid'
          borderColor='gray.200'
          borderRadius='lg'
        >
          <Text fontSize='lg' mb={4} fontWeight='semibold'>
            Color Palette
          </Text>
          <Box
            display='grid'
            gridTemplateColumns='repeat(auto-fit, minmax(80px, 1fr))'
            gap={2}
          >
            {['blue.100', 'blue.300', 'blue.500', 'blue.700', 'blue.900'].map(
              color => (
                <Box
                  key={color}
                  bg={color}
                  color={
                    color.includes('700') || color.includes('900')
                      ? 'white'
                      : 'black'
                  }
                  p={3}
                  textAlign='center'
                  borderRadius='md'
                  fontSize='sm'
                >
                  {color}
                </Box>
              )
            )}
          </Box>
        </Box>

        {/* Theme Toggle Demo */}
        <Box p={6} border='1px solid' borderColor='gray.200' borderRadius='lg'>
          <Text fontSize='lg' mb={4} fontWeight='semibold'>
            Theme Features
          </Text>
          <Text mb={2}>
            This demo shows basic Chakra UI v3 components working with theme
            switching.
          </Text>
          <Text fontSize='sm' color='gray.600'>
            Use the theme toggle button in the top-right corner to switch
            between light and dark modes.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
