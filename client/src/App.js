import React from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const handleItemCreated = (newItem) => {
    // Handle the newly created item, such as updating state or performing other actions
  };

  return (
    <div>
      <h1>Item Management</h1>
      <ItemForm onItemCreated={handleItemCreated} />
      <h2>Items</h2>
      <ItemList />
    </div>
  );
}

export default App;
