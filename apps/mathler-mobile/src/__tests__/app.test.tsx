import React from 'react';
import { render, screen } from '@testing-library/react-native';

import App from '../App';

describe('<App />', () => {
  it('should return 3 as result', async () => {
    render(<App />);
    const result = await screen.findByTestId('result');

    expect(result).toHaveTextContent('3');
  });
});
