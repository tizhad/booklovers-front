import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InProgressBooks from './InProgressBooks';

describe('<InProgressBooks />', () => {
  test('it should mount', () => {
    render(<InProgressBooks />);
    
    const inProgressBooks = screen.getByTestId('InProgressBooks');

    expect(inProgressBooks).toBeInTheDocument();
  });
});