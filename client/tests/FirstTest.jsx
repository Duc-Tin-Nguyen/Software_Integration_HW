// tests/FirstTest.jsx
import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import ItemForm from '../src/components/ItemForm';
import ItemList from '../src/components/ItemList';

test('renders App component', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Item Management/i)).toBeInTheDocument();
});

test('renders ItemForm component', () => {
  const { getByPlaceholderText } = render(<ItemForm />);
  expect(getByPlaceholderText(/Enter item name/i)).toBeInTheDocument();
});

test('renders ItemList component', () => {
  const { getByText } = render(<ItemList />);
  expect(getByText(/Items/i)).toBeInTheDocument();
});
