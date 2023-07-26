/* eslint-disable react/no-array-index-key */
import React from 'react';
import { TileRow, TileInput } from '../../../components';

export interface IncompleteRowProps {
  columns: number;
}

export const IncompleteRow: React.FC<IncompleteRowProps> = (props) => {
  const { columns } = props;

  return (
    <TileRow style={{ width: '100%' }}>
      {[...Array(columns)].map((_, index) => (
        <TileInput key={index} value="" status="empty" disabled />
      ))}
    </TileRow>
  );
};
