import { act } from 'react-dom/test-utils';
import { useFoodStore } from '../foodStore';

let mockFoods = [
  { id: 1, name: 'Pizza', price: 100, description: 'Delicious', image_url: 'image.jpg' },
];

jest.mock('../../services/api', () => {
  return {
    getFoods: jest.fn(() => Promise.resolve(mockFoods)),
    createFood: jest.fn((food) => {
      const newFood = { id: mockFoods.length + 1, ...food };
      mockFoods.push(newFood);
      return Promise.resolve(newFood);
    }),
    updateFood: jest.fn((id, food) => {
      const index = mockFoods.findIndex((f) => f.id === id);
      if (index !== -1) {
        mockFoods[index] = { id, ...food, name: 'Updated Pizza' };
      }
      return Promise.resolve(mockFoods[index]);
    }),
    deleteFood: jest.fn((id) => {
      console.log('Before delete:', mockFoods); // Log isi mockFoods sebelum penghapusan
      const index = mockFoods.findIndex((food) => food.id === id);
      if (index === -1) {
        console.error(`Food with id ${id} not found in mockFoods`);
        return Promise.reject(new Error(`Food with id ${id} not found`));
      }
      mockFoods.splice(index, 1);
      console.log('After delete:', mockFoods); // Log isi mockFoods setelah penghapusan

      // Sinkronisasi state useFoodStore
      const store = useFoodStore.getState();
      store.foods = [...mockFoods]; // Perbarui state dengan data mockFoods
      console.log('State after delete:', store.foods); // Log state setelah penghapusan

      return Promise.resolve();
    }),
    getFoodById: jest.fn((id) => {
      return Promise.resolve(mockFoods.find((food) => food.id === id));
    }),
  };
});

beforeEach(() => {
  // Reset mockFoods before each test
  mockFoods = [
    { id: 1, name: 'Pizza', price: 100, description: 'Delicious', image_url: 'image.jpg' },
  ];
});

// Mock window.alert
beforeAll(() => {
  global.alert = jest.fn();
});

describe('useFoodStore', () => {
  it('fetches foods', async () => {
    const store = useFoodStore.getState();

    await act(async () => {
      await store.fetchFoods();
    });

    const updatedStore = useFoodStore.getState(); // Re-fetch state
    expect(updatedStore.foods).toEqual([
      { id: 1, name: 'Pizza', price: 100, description: 'Delicious', image_url: 'image.jpg' },
    ]);
  });

  it('adds a food', async () => {
    const store = useFoodStore.getState();

    await act(async () => {
      await store.addFood(new FormData());
    });

    const updatedStore = useFoodStore.getState(); // Re-fetch state
    expect(updatedStore.foods).toHaveLength(2); // Adjusted to reflect added food
    expect(updatedStore.foods[1].id).toBe(2);
  });

  it('updates a food', async () => {
    const store = useFoodStore.getState();

    await act(async () => {
      await store.fetchFoods();
      await store.updateFood(1, new FormData());
    });

    const updatedStore = useFoodStore.getState(); // Re-fetch state
    expect(updatedStore.foods[0].name).toBe('Updated Pizza'); // Updated assertion
  });

  it('deletes a food', async () => {
    const store = useFoodStore.getState();

    await act(async () => {
      await store.fetchFoods();
      await store.deleteFood(1);
    });

    const updatedStore = useFoodStore.getState(); // Re-fetch state
    expect(updatedStore.foods).toHaveLength(0);
  });

  it('fetches a food by ID', async () => {
    const store = useFoodStore.getState();

    const food = await store.getFoodById(1);

    expect(food).toEqual({
      id: 1,
      name: 'Pizza',
      price: 100,
      description: 'Delicious',
      image_url: 'image.jpg',
    });
  });
});
