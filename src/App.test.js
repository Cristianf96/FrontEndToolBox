import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('File name');
  expect(linkElement).toBeInTheDocument();
});

test('renders table with data', () => {
  render(<App />);
  const tableElement = screen.getByTestId('table');
  expect(tableElement).toBeInTheDocument();
});
