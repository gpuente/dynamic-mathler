/* eslint-disable react/no-array-index-key */
import React from 'react';
import { TileRow, TileInput, TileStatus } from '../../../components';

export interface CompleteRowProps {
  values: {
    value: string;
    status: TileStatus;
  }[];
}

export const CompleteRow: React.FC<CompleteRowProps> = (props) => {
  const { values } = props;

  return (
    <TileRow style={{ width: '100%' }}>
      {values.map(({ value, status }, index) => (
        <TileInput key={index} value={value} status={status} disabled />
      ))}
    </TileRow>
  );
};
