import React from 'react';
import { render, screen } from '@testing-library/react-native';

import App from '../App';

describe('<App />', () => {
  it('should render game screen', async () => {
    render(<App />);
    const result = await screen.findByTestId('game-screen');
    expect(result).toBeTruthy();
  });

  it('should render top-bar', async () => {
    render(<App />);
    const result = await screen.findByTestId('top-bar');
    expect(result).toBeTruthy();
  });

  it('should render keyboard', async () => {
    render(<App />);
    const result = await screen.findByTestId('keyboard');
    expect(result).toBeTruthy();
  });
});
