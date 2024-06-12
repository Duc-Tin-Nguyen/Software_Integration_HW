// tests/TestWithMockDataWithBranching.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemList from '../src/components/ItemList';

test('updates an item and reflects changes', async () => {
  const mockItems = [{ _id: '1', name: 'Item 1', description: 'Description 1' }];
  const setItems = jest.fn();

  const { getByText, getByDisplayValue } = render(<ItemList items={mockItems} setItems={setItems} />);

  fireEvent.click(getByText('Edit'));
  fireEvent.change(getByDisplayValue('Item 1'), { target: { value: 'Updated Item 1' } });
  fireEvent.change(getByDisplayValue('Description 1'), { target: { value: 'Updated Description 1' } });
  fireEvent.click(getByText('Save'));

  expect(setItems).toHaveBeenCalledWith([{ _id: '1', name: 'Updated Item 1', description: 'Updated Description 1' }]);
});
