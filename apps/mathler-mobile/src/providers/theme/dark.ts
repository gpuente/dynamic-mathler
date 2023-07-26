import { ThemeValue, Theme } from './types';

export const darkTheme: ThemeValue = {
  theme: Theme.Dark,
  palette: {
    primary: 'blue',
    background: '#000000',
    text: '#ffffff',
    modal: {
      background: '#ffffff',
    },
    button: {
      primary: '#66ccff',
    },
    tile: {
      background: {
        idle: '#feffff',
        active: '#66ccff',
        error: '#ff6680',
        warning: '#fdfd96',
        success: '#b8d8be',
        empty: '#bbd9d8',
      },
      backgroundShadow: {
        idle: '#b7d5d6',
        active: '#5fa9f2',
        error: '#cb527b',
        warning: '#e0e08a',
        success: '#a3c0ad',
        empty: '#bbd9d8',
      },
      text: '#000000',
    },
    grid: {
      background: '#cae1db',
    },
    keyboard: {
      background: '#dbe4e9',
      text: '#000000',
    },
  },
};
