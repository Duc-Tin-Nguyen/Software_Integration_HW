import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [updatedItemId, setUpdatedItemId] = useState(null);

  const handleItemCreated = (newItem) => {
    // Handle the newly created item, such as updating state or performing other actions
  };

  const handleItemUpdated = (id, newData) => {
    setUpdatedItemId(id);
    // Handle the updated item, such as updating state or performing other actions
  };

  return (
    <div>
      <h1>Item Management</h1>
      <ItemForm onItemCreated={handleItemCreated} />
      <h2>Items</h2>
      <ItemList onItemUpdated={handleItemUpdated} />
      {updatedItemId && <p>This item with ID {updatedItemId} has been updated.</p>}
    </div>
  );
}

export default App;
