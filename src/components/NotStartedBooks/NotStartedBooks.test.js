import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotStartedBooks from './NotStartedBooks';

describe('<NotStartedBooks />', () => {
  test('it should mount', () => {
    render(<NotStartedBooks />);
    
    const notStartedBooks = screen.getByTestId('NotStartedBooks');

    expect(notStartedBooks).toBeInTheDocument();
  });
});