export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface ThemeValue {
  theme: Theme;
  palette: {
    primary: string;
    tile: {
      background: {
        idle: string;
        active: string;
        error: string;
        warning: string;
        success: string;
        empty: string;
      };
      backgroundShadow: {
        idle: string;
        active: string;
        error: string;
        warning: string;
        success: string;
        empty: string;
      };
      text: string;
    };
    grid: {
      background: string;
    };
  };
}
