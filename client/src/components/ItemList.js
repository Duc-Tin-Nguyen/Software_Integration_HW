import React, { useState, useEffect } from 'react';
import { fetchItems, deleteItem, updateItem } from '../services/api';
import '../App.css';

const ItemList = ({ items, setItems }) => {
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState('');
  const [editingItemDescription, setEditingItemDescription] = useState('');

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
  }, [setItems]);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await updateItem(id, { name: editingItemName, description: editingItemDescription });
      setItems(items.map(item => item._id === id ? { ...item, name: editingItemName, description: editingItemDescription } : item));
      setEditingItemId(null);
      setEditingItemName('');
      setEditingItemDescription('');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          {editingItemId === item._id ? (
            <div>
              <input
                type="text"
                value={editingItemName}
                onChange={(e) => setEditingItemName(e.target.value)}
              />
              <textarea
                value={editingItemDescription}
                onChange={(e) => setEditingItemDescription(e.target.value)}
              ></textarea>
              <div className="edit-buttons">
                <button onClick={() => handleUpdate(item._id)}>Save</button>
                <button onClick={() => setEditingItemId(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
              </div>
              <div className="edit-buttons">
                <button onClick={() => {
                  setEditingItemId(item._id);
                  setEditingItemName(item.name);
                  setEditingItemDescription(item.description);
                }}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
