import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export const TileRow: React.FC<ViewProps> = (props) => {
  const { children, style, ...restProps } = props;

  return (
    <View style={[styles.row, style]} {...restProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
