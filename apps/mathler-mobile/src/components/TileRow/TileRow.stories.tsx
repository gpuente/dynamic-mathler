/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { View } from 'react-native';
import { TileRow } from './TileRow';
import { TileInput } from '../TileInput';

const Template: ComponentStory<typeof TileRow> = (args) => (
  <TileRow {...args}>
    <TileInput value="8" status="idle" onPress={() => {}} />
    <TileInput value="1" status="success" onPress={() => {}} />
    <TileInput value="+" status="error" onPress={() => {}} />
    <TileInput value="8" status="warning" onPress={() => {}} />
    <TileInput value="/" status="active" onPress={() => {}} />
    <TileInput value="" status="empty" onPress={() => {}} disabled />
  </TileRow>
);

export default {
  title: 'TileRow',
  component: TileRow,
  argTypes: {},
  decorators: [
    (Story: React.ElementType) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: '#cae1db',
            width: 360,
            height: 70,
            borderRadius: 10,
          }}
        >
          <Story />
        </View>
      </View>
    ),
  ],
} as ComponentMeta<typeof TileRow>;

export const Default = Template.bind({});
