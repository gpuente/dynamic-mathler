import React from 'react';
import { View } from 'react-native';
import { TileInput } from './TileInput';

const TileInputMeta = {
  title: 'TileInput',
  component: TileInput,
  argTypes: {
    onPress: { action: 'onPress' },
    value: { type: 'string' },
    disabled: { type: 'boolean' },
    status: {
      control: 'select',
      options: ['idle', 'active', 'error', 'warning', 'success'],
      defaultValue: 'idle',
    },
  },
  decorators: [
    (Story: React.ElementType) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: '#cae1db',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default TileInputMeta;

export const Default = {
  args: {
    value: '8',
  },
};
