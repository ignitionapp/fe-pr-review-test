import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: 'blue', // Set default color palette to blue
    },
  },
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { _light: '{colors.white}', _dark: '#0f0f0f' },
          },
          subtle: {
            value: { _light: '{colors.gray.50}', _dark: '#1a1a1a' },
          },
          muted: {
            value: { _light: '{colors.gray.100}', _dark: '#262626' },
          },
        },
        fg: {
          DEFAULT: {
            value: { _light: '{colors.black}', _dark: '#fafafa' },
          },
          muted: {
            value: { _light: '{colors.gray.600}', _dark: '#a1a1aa' },
          },
          subtle: {
            value: { _light: '{colors.gray.500}', _dark: '#71717a' },
          },
        },
        border: {
          DEFAULT: {
            value: { _light: '{colors.gray.200}', _dark: '#404040' },
          },
          muted: {
            value: { _light: '{colors.gray.100}', _dark: '#262626' },
          },
        },
      },
    },
    tokens: {
      fonts: {
        heading: { value: 'Inter, system-ui, sans-serif' },
        body: { value: 'Inter, system-ui, sans-serif' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
