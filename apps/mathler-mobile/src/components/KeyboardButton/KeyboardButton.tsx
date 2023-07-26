import React from 'react';
import {
  View,
  Text,
  TextProps,
  ViewProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../providers/theme';

export interface KeyboardButtonProps extends ViewProps {
  onPress: (value: string) => void;
  value: string;
  text: string;
  textProps?: TextProps;
}

export const KeyboardButton: React.FC<KeyboardButtonProps> = (props) => {
  const { style, onPress, value, text, textProps, ...restProps } = props;
  const { palette } = useTheme();

  const buttonStyles = {
    ...styles.button,
    backgroundColor: palette.keyboard.background,
  };

  const textStyles = {
    ...styles.text,
    color: palette.keyboard.text,
  };

  return (
    <TouchableOpacity onPress={() => onPress(value)}>
      <View style={[buttonStyles, style]} {...restProps}>
        <Text style={textStyles} {...textProps}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    padding: 4,
    borderRadius: 4,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
