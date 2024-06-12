import React, { useState, useEffect } from 'react';
import { fetchItems, deleteItem, updateItem } from '../services/api';

const ItemList = ({ onItemUpdated }) => {
  const [items, setItems] = useState([]);
  const [editableItemId, setEditableItemId] = useState(null);
  const [editedItemData, setEditedItemData] = useState({ name: '', description: '' });

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

  const handleEdit = (item) => {
    setEditableItemId(item._id);
    setEditedItemData({ name: item.name, description: item.description });
  };

  const handleCancelEdit = () => {
    setEditableItemId(null);
    setEditedItemData({ name: '', description: '' });
  };

  const handleUpdate = async (id) => {
    try {
      await updateItem(id, editedItemData);
      setEditableItemId(null);
      if (onItemUpdated) {
        onItemUpdated(id, editedItemData);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleChange = (e) => {
    setEditedItemData({ ...editedItemData, [e.target.name]: e.target.value });
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item._id}>
          {editableItemId === item._id ? (
            <div>
              <input
                type="text"
                name="name"
                value={editedItemData.name}
                onChange={handleChange}
              />
              <textarea
                name="description"
                value={editedItemData.description}
                onChange={handleChange}
              ></textarea>
              <button onClick={() => handleUpdate(item._id)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <strong>{item.name}</strong>
              <p>{item.description}</p>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
