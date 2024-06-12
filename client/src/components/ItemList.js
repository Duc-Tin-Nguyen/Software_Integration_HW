import React, { useEffect, useState } from 'react';
import { fetchItems, deleteItem } from '../services/api';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const itemsData = await fetchItems();
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItemsData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          {item.name}
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
