import {
  ingredientsSlice,
  fetchIngredients,
  initialState,
  selectIngredients
} from './index';
import { getIngredientsApi } from '@api';
import { SerializedError } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

jest.mock('@api');

describe('ingredientsSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен устанавливать isLoading в true при вызове fetchIngredients.pending', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.pending('someRequestId')
    ); // Передаем строку
    expect(state.isLoading).toBe(true);
  });

  it('должен устанавливать isLoading в false и data при вызове fetchIngredients.fulfilled', async () => {
    const mockData: TIngredient[] = [
      // Пример данных ингредиентов
      {
        _id: '1',
        name: 'Инредиент 1',
        type: 'main',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 200,
        price: 100,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
      // ... другие ингредиенты
    ];
    (getIngredientsApi as jest.Mock).mockResolvedValue(mockData);
    const state = await ingredientsSlice.reducer(
      initialState,
      fetchIngredients.fulfilled(mockData, 'someRequestId') // Передаем строку
    );
    expect(state.isLoading).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('должен устанавливать isLoading в false и error при вызове fetchIngredients.rejected', async () => {
    const mockError: Error = {
      name: 'Error',
      message: 'Ошибка получения данных'
    };
    (getIngredientsApi as jest.Mock).mockRejectedValue(mockError);
    const state = await ingredientsSlice.reducer(
      initialState,
      fetchIngredients.rejected(mockError, 'someRequestId') // Передаем строку
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockError);
  });

  it('должен возвращать список ингредиентов с помощью селектора selectIngredients', () => {
    const state = {
      ingredients: {
        isLoading: false,
        error: null,
        data: [
          // Пример данных ингредиентов
          {
            _id: '1',
            name: 'Инредиент 1',
            type: 'main',
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 200,
            price: 100,
            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-02-large.png'
          }
          // ... другие ингредиенты
        ]
      }
    };
    const ingredients = selectIngredients(state as any); // Приводим к типу any для селектора
    expect(ingredients).toEqual(state.ingredients.data);
  });
});
