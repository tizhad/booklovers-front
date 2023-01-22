import React from 'react';
import { render, screen } from '@testing-library/react';
import FinishedBooks from './FinishedBooks';

describe('FinishedBooks', () => {
  it('should not render if no finished books are passed', () => {
    const books = [{ title: 'Book 1', status: 'currently-reading' }];
    const updateBook = jest.fn();
    render(<FinishedBooks books={books} updateBook={updateBook} />);
    expect(screen.queryByText('Finished')).toBeNull();
  });


  describe('FinishedBooks', () => {
    it('should render finished books', () => {
      const books = [
        { title: 'Book 1', status: 'read' },
        { title: 'Book 2', status: 'read' },
      ];
      const updateBook = jest.fn();
      render(<FinishedBooks books={books} updateBook={updateBook} />);
      expect(screen.getByText('Finished Books')).toBeInTheDocument();
    });
  });

});
