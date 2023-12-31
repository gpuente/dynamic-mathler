import React, { createContext, useContext, useState, useMemo } from 'react';

import { darkTheme } from './dark';
import { lightTheme } from './light';
import { Theme, ThemeValue } from './types';

export interface ThemeContextValue extends ThemeValue {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/* eslint-disable @typescript-eslint/no-empty-function */
export const ThemeContext = createContext<ThemeContextValue>({
  ...lightTheme,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useTheme = (): ThemeContextValue => {
  const theme = useContext(ThemeContext);
  return theme;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  const themeContextValue: ThemeContextValue = useMemo(
    () => ({
      ...(theme === Theme.Light ? lightTheme : darkTheme),
      setTheme,
      toggleTheme: () =>
        theme === Theme.Light ? setTheme(Theme.Dark) : setTheme(Theme.Light),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
