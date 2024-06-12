const API_URL = 'http://localhost:3000'; 

export const createItem = async (data) => {
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const newItem = await response.json();
  return newItem;
};

export const fetchItems = async () => {
  const response = await fetch(`${API_URL}/items`);
  const items = await response.json();
  return items;
};

export const deleteItem = async (id) => {
  await fetch(`${API_URL}/items/${id}`, {
    method: 'DELETE',
  });
};
