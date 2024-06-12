import React, { useState } from 'react';
import { createItem } from '../services/api';

const ItemForm = ({ onItemCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = await createItem({ name });
      onItemCreated(newItem);
      setName('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
