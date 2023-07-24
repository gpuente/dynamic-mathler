import { sum } from '../mathler';

describe('mathler', () => {
  it('sums two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
