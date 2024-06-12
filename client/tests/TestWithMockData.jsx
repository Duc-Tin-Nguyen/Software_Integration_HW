// tests/TestWithMockData.jsx
import React from 'react';
import { render } from '@testing-library/react';
import ItemList from '../src/components/ItemList';

test('renders items from mock data', () => {
  const mockItems = [
    { _id: '1', name: 'Item 1', description: 'Description 1' },
    { _id: '2', name: 'Item 2', description: 'Description 2' }
  ];
  const { getByText } = render(<ItemList items={mockItems} setItems={jest.fn()} />);

  expect(getByText('Item 1')).toBeInTheDocument();
  expect(getByText('Item 2')).toBeInTheDocument();
});
