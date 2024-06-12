// tests/TestingStateChange.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemList from '../src/components/ItemList';

test('handles state changes correctly', () => {
  const mockItems = [{ _id: '1', name: 'Item 1', description: 'Description 1' }];
  const setItems = jest.fn();

  const { getByText } = render(<ItemList items={mockItems} setItems={setItems} />);

  fireEvent.click(getByText('Delete'));

  expect(setItems).toHaveBeenCalledWith([]);
});
