/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { View } from 'react-native';
import { TileGrid } from './TileGrid';
import { TileRow } from '../TileRow';
import { TileInput } from '../TileInput';

const Template: ComponentStory<typeof TileGrid> = (args) => (
  <TileGrid
    style={{ width: '100%', height: '100%', borderRadius: 10, padding: 5 }}
    {...args}
  >
    <TileRow style={{ height: 70, width: '100%' }}>
      <TileInput value="8" status="error" onPress={() => {}} disabled />
      <TileInput value="9" status="error" onPress={() => {}} disabled />
      <TileInput value="+" status="warning" onPress={() => {}} disabled />
      <TileInput value="3" status="error" onPress={() => {}} disabled />
      <TileInput value="*" status="success" onPress={() => {}} disabled />
      <TileInput value="6" status="success" onPress={() => {}} disabled />
    </TileRow>
    <TileRow style={{ height: 70, width: '100%' }}>
      <TileInput value="1" status="warning" onPress={() => {}} disabled />
      <TileInput value="+" status="success" onPress={() => {}} disabled />
      <TileInput value="8" status="error" onPress={() => {}} disabled />
      <TileInput value="8" status="error" onPress={() => {}} disabled />
      <TileInput value="*" status="success" onPress={() => {}} disabled />
      <TileInput value="6" status="success" onPress={() => {}} disabled />
    </TileRow>
    <TileRow style={{ height: 70, width: '100%' }}>
      <TileInput value="7" status="idle" onPress={() => {}} />
      <TileInput value="+" status="idle" onPress={() => {}} />
      <TileInput value="3" status="idle" onPress={() => {}} />
      <TileInput value="" status="active" onPress={() => {}} />
      <TileInput value="" status="idle" onPress={() => {}} />
      <TileInput value="" status="idle" onPress={() => {}} />
    </TileRow>
    <TileRow style={{ height: 70, width: '100%' }}>
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
    </TileRow>
    <TileRow style={{ height: 70, width: '100%' }}>
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
    </TileRow>
    <TileRow style={{ height: 70, width: '100%' }}>
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
      <TileInput value="" status="empty" onPress={() => {}} disabled />
    </TileRow>
  </TileGrid>
);

export default {
  title: 'TileGrid',
  component: TileGrid,
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
            width: 350,
            height: 420,
          }}
        >
          <Story />
        </View>
      </View>
    ),
  ],
} as ComponentMeta<typeof TileGrid>;

export const Default = Template.bind({});
