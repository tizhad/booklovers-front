import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FinishedBooks from './FinishedBooks';

describe('<FinishedBooks />', () => {
  test('it should mount', () => {
    render(<FinishedBooks />);
    
    const finishedBooks = screen.getByTestId('FinishedBooks');

    expect(finishedBooks).toBeInTheDocument();
  });
});