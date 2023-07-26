import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../providers/theme';

export type TileStatus =
  | 'idle'
  | 'active'
  | 'error'
  | 'warning'
  | 'success'
  | 'empty';

export interface TileInputProps {
  value?: string;
  status?: TileStatus;
  onPress?: () => void;
  disabled?: boolean;
}

export const TileInput: React.FC<TileInputProps> = (props) => {
  const { value, onPress, status = 'idle', disabled = false } = props;
  const { palette } = useTheme();

  const tileShadow = {
    ...styles.shadow,
    backgroundColor: palette.tile.backgroundShadow[status],
  };

  const tileStyles = {
    ...styles.tileContainer,
    backgroundColor: palette.tile.background[status],
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={tileShadow}>
        <View style={tileStyles}>
          <Text style={styles.text}>{value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
    overflow: 'hidden',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  shadow: {
    height: 50,
    borderRadius: 10,
  },
});
