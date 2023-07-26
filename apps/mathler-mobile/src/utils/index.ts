import { CharStatus } from 'mathler-core';
import { TileStatus } from '../components/TileInput';

export const charStatusToTileStatus = (status: CharStatus): TileStatus => {
  switch (status) {
    case CharStatus.Correct:
      return 'success';
    case CharStatus.Incorrect:
      return 'error';
    case CharStatus.InTheOperation:
      return 'warning';
    default:
      return 'empty';
  }
};
