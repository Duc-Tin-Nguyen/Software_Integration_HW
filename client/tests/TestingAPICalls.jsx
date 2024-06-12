// tests/TestingAPICalls.jsx
import { createItem, fetchItems, deleteItem, updateItem } from '../src/services/api';

const API_URL = 'http://localhost:3000/api';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

describe('API service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('createItem makes POST request and returns data', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: 'Test Item' }),
      })
    );

    const data = { name: 'Test Item', description: 'Test Description' };
    const result = await createItem(data);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/items`, expect.any(Object));
    expect(result.name).toBe('Test Item');
  });

  test('fetchItems makes GET request and returns data', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ name: 'Test Item' }]),
      })
    );

    const result = await fetchItems();
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/items`);
    expect(result[0].name).toBe('Test Item');
  });

  test('deleteItem makes DELETE request', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true }));

    await deleteItem('1');
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/items/1`, { method: 'DELETE' });
  });

  test('updateItem makes PUT request', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true }));

    const data = { name: 'Updated Item', description: 'Updated Description' };
    await updateItem('1', data);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/items/1`, expect.any(Object));
  });
});
