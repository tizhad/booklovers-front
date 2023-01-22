import React from "react"
import { render } from '@testing-library/react';
import NotStartedBooks from './NotStartedBooks';

describe('NotStartedBooks', () => {
  it('should not render anything when no books are passed', () => {
    const { queryByTestId } = render(<NotStartedBooks books={null} />);
    expect(queryByTestId('not-started-books')).toBeNull();
  });

  it('should render the correct number of books with status "to-read"', () => {
    const books = [
      { googleID: 1, status: 'to-read' },
      { googleID: 2, status: 'to-read' },
      { googleID: 3, status: 'reading' }
    ];
    const { getAllByTestId } = render(<NotStartedBooks books={books} />);
  });
});
