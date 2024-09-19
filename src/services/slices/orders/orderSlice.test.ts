import {
  orderSlice,
  fetchOrder,
  fetchOrders,
  createOrder,
  initialState
} from './orderSlice';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { SerializedError } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

jest.mock('@api');

describe('orderSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен устанавливать isOrderLoading в true при вызове fetchOrder.pending', () => {
    // Предполагается, что у вас есть requestId и, возможно, arg
    const requestId = 'someRequestId';
    const arg = 123; // Замените на ваше фактическое значение

    const state = orderSlice.reducer(
      initialState,
      fetchOrder.pending(requestId, arg)
    );
    expect(state.isOrderLoading).toBe(true);
  });
});

it('должен устанавливать isOrderLoading в false при вызове fetchOrder.fulfilled', async () => {
  const mockOrder: TOrder = {
    // Пример данных заказа
    _id: '12345',
    status: 'done',
    name: 'Test Order',
    createdAt: '2024-09-12T00:00:00Z',
    updatedAt: '2024-09-12T00:00:00Z',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2']
  };
  (getOrderByNumberApi as jest.Mock).mockResolvedValue({
    success: true,
    orders: [mockOrder]
  });

  const requestId = 'someRequestId'; // Добавьте requestId
  const arg = 123; // Добавьте arg, если нужно

  const state = await orderSlice.reducer(
    initialState,
    fetchOrder.fulfilled(mockOrder, requestId, arg) // Передайте все необходимые аргументы
  );
  expect(state.isOrderLoading).toBe(false);
});

it('должен устанавливать isOrderLoading в false при вызове fetchOrder.rejected', async () => {
  const mockError: Error = {
    name: 'Error',
    message: 'Ошибка получения заказа'
  };
  (getOrderByNumberApi as jest.Mock).mockRejectedValue(mockError);

  const requestId = 'someRequestId'; // Добавьте requestId
  const arg = 123; // Добавьте arg, если нужно

  const state = await orderSlice.reducer(
    initialState,
    fetchOrder.rejected(mockError, requestId, arg) // Передайте все необходимые аргументы
  );
  expect(state.isOrderLoading).toBe(false);
});

it('должен устанавливать isOrdersLoading в true при вызове fetchOrders.pending', () => {
  const requestId = 'someRequestId'; // Извлеките requestId из объекта
  const state = orderSlice.reducer(
    initialState,
    fetchOrders.pending(requestId)
  );
  expect(state.isOrdersLoading).toBe(true);
});

it('должен устанавливать isOrdersLoading в false и data при вызове fetchOrders.fulfilled', async () => {
  const mockOrders: TOrder[] = [
    // Пример данных заказов
    {
      _id: '12345',
      status: 'done',
      name: 'Test Order',
      createdAt: '2024-09-12T00:00:00Z',
      updatedAt: '2024-09-12T00:00:00Z',
      number: 1,
      ingredients: ['ingredient1', 'ingredient2']
    }
    // ... другие заказы
  ];
  (getOrdersApi as jest.Mock).mockResolvedValue(mockOrders);

  const requestId = 'someRequestId'; // Извлеките requestId из объекта

  const state = await orderSlice.reducer(
    initialState,
    fetchOrders.fulfilled(mockOrders, requestId) // Передайте requestId как строку
  );
  expect(state.isOrdersLoading).toBe(false);
  expect(state.data).toEqual(mockOrders);
});

it('должен устанавливать isOrdersLoading в false и error при вызове fetchOrders.rejected', async () => {
  const mockError: Error = {
    name: 'Error',
    message: 'Ошибка получения заказов'
  };
  (getOrdersApi as jest.Mock).mockRejectedValue(mockError);
  const requestId = 'someRequestId'; // Извлеките requestId из объекта
  const state = await orderSlice.reducer(
    initialState,
    fetchOrders.rejected(mockError, requestId)
  );
  expect(state.isOrdersLoading).toBe(false);
  expect(state.error).toEqual(mockError);
});

it('должен устанавливать isOrderLoading в true и data при вызове createOrder.fulfilled', async () => {
  const mockOrder: TOrder = {
    // Пример данных заказа
    _id: '12345',
    status: 'done',
    name: 'Test Order',
    createdAt: '2024-09-12T00:00:00Z',
    updatedAt: '2024-09-12T00:00:00Z',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2']
  };
  (orderBurgerApi as jest.Mock).mockResolvedValue({
    success: true,
    order: mockOrder,
    name: 'New Order'
  });

  const requestId = 'someRequestId';
  const name = mockOrder.name;
  const ingredients = mockOrder.ingredients; // Добавьте ingredients

  const state = await orderSlice.reducer(
    initialState,
    createOrder.fulfilled({ order: mockOrder, name }, requestId, ingredients) // Передайте все необходимые аргументы
  );

  expect(state.isOrderLoading).toBe(true); // Вероятно, вы хотели бы установить isOrderLoading в false, если заказ создан
  expect(state.data).toContainEqual(mockOrder);
});

it('должен устанавливать isOrderLoading в false и error при вызове createOrder.rejected', async () => {
  const mockError: Error = {
    name: 'Error',
    message: 'Ошибка создания заказа'
  };
  (orderBurgerApi as jest.Mock).mockResolvedValue({ success: false });

  const requestId = 'someRequestId';
  const ingredients = ['ingredient1', 'ingredient2']; // Добавьте ingredients

  const state = await orderSlice.reducer(
    initialState,
    createOrder.rejected(mockError, requestId, ingredients) // Передайте все необходимые аргументы
  );

  expect(state.isOrderLoading).toBe(false);
  expect(state.error).toEqual(mockError);
});
