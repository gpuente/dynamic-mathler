import React from 'react';
import { StatusBar as StatusBarExpo } from 'expo-status-bar';
import { useTheme } from '../../providers/theme';
import { Theme } from '../../providers/theme/types';

export const StatusBar: React.FC = () => {
  const { theme } = useTheme();

  return <StatusBarExpo style={theme === Theme.Light ? 'dark' : 'light'} />;
};
