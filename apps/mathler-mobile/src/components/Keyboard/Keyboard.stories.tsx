/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { View } from 'react-native';
import { Keyboard } from './Keyboard';

const Template: ComponentStory<typeof Keyboard> = (args) => (
  <Keyboard {...args} />
);

export default {
  title: 'Keyboard',
  component: Keyboard,
  argTypes: {
    onInput: { action: 'onInput' },
    onDelete: { action: 'onDelete' },
    onValidate: { action: 'onValidate' },
    i18n: { action: 'object' },
  },
  decorators: [
    (Story: React.ElementType) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
        }}
      >
        <Story />
      </View>
    ),
  ],
} as ComponentMeta<typeof Keyboard>;

export const Default = Template.bind({});
Default.args = {
  i18n: {
    validate: 'Validate',
    delete: 'Delete',
  },
};
