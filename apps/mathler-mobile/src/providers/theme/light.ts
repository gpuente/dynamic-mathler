import { ThemeValue, Theme } from './types';

export const lightTheme: ThemeValue = {
  theme: Theme.Light,
  palette: {
    primary: 'yellow',
    tile: {
      background: {
        idle: '#feffff',
        active: '#66ccff',
        error: '#ff6680',
        warning: '#fdfd96',
        success: '#b8d8be',
      },
      backgroundShadow: {
        idle: '#b7d5d6',
        active: '#5fa9f2',
        error: '#cb527b',
        warning: '#e0e08a',
        success: '#a3c0ad',
      },
      text: '#000000',
    },
  },
};
