/* eslint-disable react/no-array-index-key */
import React from 'react';
import { TileRow, TileInput } from '../../../components';

export interface ActiveRowProps {
  values: (string | undefined)[];
  activeIndex: number;
  onPress: (index: number) => void;
}

export const ActiveRow: React.FC<ActiveRowProps> = (props) => {
  const { values, activeIndex, onPress } = props;

  return (
    <TileRow style={{ width: '100%' }}>
      {values.map((value, index) => (
        <TileInput
          key={index}
          value={value}
          onPress={() => onPress(index)}
          status={index === activeIndex ? 'active' : 'idle'}
        />
      ))}
    </TileRow>
  );
};
