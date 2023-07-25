import React from 'react';
import { ThemeProvider } from '../src/providers';

const ThemeDecorator = (Story: React.ElementType) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

export const decorators = [ThemeDecorator];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
