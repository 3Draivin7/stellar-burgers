import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { setOrderModalData } from '../constructor/burgerConstructorSlice';

export type TOrdersState = {
  isOrderLoading: boolean;
  isOrdersLoading: boolean;
  error: null | SerializedError;
  data: TOrder[];
  orderModalData: TOrder | null;
};

export const initialState: TOrdersState = {
  isOrderLoading: false, // Изначально установите в false
  isOrdersLoading: false, // Изначально установите в false
  error: null,
  data: [],
  orderModalData:null
};

export const createOrder = createAsyncThunk<
  { order: TOrder; name: string },
  string[]
>('orders/create', async (data, { rejectWithValue }) => {
  const response = await orderBurgerApi(data);

  if (!response?.success) {
    return rejectWithValue(response);
  }

  return { order: response.order, name: response.name };
});

export const fetchOrder = createAsyncThunk<TOrder, number>(
  'orders/fetchOrder',
  async (data, { rejectWithValue }) => {
    const response = await getOrderByNumberApi(data);

    if (!response?.success) {
      return rejectWithValue(response); // Передаем ошибку
    }

    return response.orders[0];
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => await getOrdersApi()
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.error = null; // Установка error в null после успешного получения
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error; // Сохранение ошибки
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.error = action.error;
      })
      .addCase(createOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isOrderLoading = true;
        state.error = null; // Сброс ошибки после успешного создания заказа
        state.orderModalData = action.payload.order;
        state.data.push(action.payload.order);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error;
      });
  }
});
export const {
  resetOrderModalData
} = orderSlice.actions;

export default orderSlice.reducer;
