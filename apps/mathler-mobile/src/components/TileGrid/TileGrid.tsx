import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../../providers/theme';

export const TileGrid: React.FC<ViewProps> = (props) => {
  const { children, style, ...restProps } = props;
  const { palette } = useTheme();

  const gridStyles = {
    ...styles.grid,
    backgroundColor: palette.grid.background,
  };

  return (
    <View style={[gridStyles, style]} {...restProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
