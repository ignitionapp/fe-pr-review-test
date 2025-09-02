import { Button, Box } from '@chakra-ui/react';
import type { ButtonProps, BoxProps } from '@chakra-ui/react';
import { ThemeProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import * as React from 'react';

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute='class' disableTransitionOnChange {...props} />
  );
}

export type ColorMode = 'light' | 'dark';

export interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  toggleColorMode: () => void;
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme();
  const colorMode = forcedTheme || resolvedTheme;
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  return {
    colorMode: colorMode as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  };
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? dark : light;
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? '🌙' : '☀️';
}

export const ColorModeButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function ColorModeButton(props, ref) {
    const { toggleColorMode } = useColorMode();
    return (
      <Button
        onClick={toggleColorMode}
        variant='ghost'
        size='sm'
        ref={ref}
        {...props}
      >
        <ColorModeIcon />
      </Button>
    );
  }
);

export const LightMode = React.forwardRef<HTMLDivElement, BoxProps>(
  function LightMode(props, ref) {
    return (
      <Box color='fg' className='chakra-theme light' ref={ref} {...props} />
    );
  }
);

export const DarkMode = React.forwardRef<HTMLDivElement, BoxProps>(
  function DarkMode(props, ref) {
    return (
      <Box color='fg' className='chakra-theme dark' ref={ref} {...props} />
    );
  }
);
