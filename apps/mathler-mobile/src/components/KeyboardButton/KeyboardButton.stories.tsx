/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { View } from 'react-native';
import { KeyboardButton } from './KeyboardButton';

const Template: ComponentStory<typeof KeyboardButton> = (args) => (
  <KeyboardButton {...args} />
);

export default {
  title: 'KeyboardButton',
  component: KeyboardButton,
  argTypes: {
    onPress: { action: 'onPress' },
    value: { control: 'text' },
    text: { control: 'text' },
  },
  decorators: [
    (Story: React.ElementType) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Story />
      </View>
    ),
  ],
} as ComponentMeta<typeof KeyboardButton>;

export const Default = Template.bind({});
Default.args = {
  value: '0',
  text: '0',
};
