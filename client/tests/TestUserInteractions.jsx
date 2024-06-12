// tests/TestUserInteractions.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemForm from '../src/components/ItemForm';
import ItemList from '../src/components/ItemList';

test('submits the form and clears inputs', async () => {
  const handleItemCreated = jest.fn();
  const { getByPlaceholderText, getByText } = render(<ItemForm onItemCreated={handleItemCreated} />);

  fireEvent.change(getByPlaceholderText('Enter item name'), { target: { value: 'Test Item' } });
  fireEvent.change(getByPlaceholderText('Enter item description'), { target: { value: 'Test Description' } });
  fireEvent.click(getByText('Add Item'));

  expect(handleItemCreated).toHaveBeenCalled();
  expect(getByPlaceholderText('Enter item name').value).toBe('');
  expect(getByPlaceholderText('Enter item description').value).toBe('');
});

test('deletes an item from the list', async () => {
  const mockItems = [{ _id: '1', name: 'Item 1', description: 'Description 1' }];
  const { getByText, queryByText } = render(<ItemList items={mockItems} setItems={jest.fn()} />);

  fireEvent.click(getByText('Delete'));

  expect(queryByText('Item 1')).toBeNull();
});
