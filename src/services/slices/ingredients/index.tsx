import { getIngredientsApi } from '@api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TIngredientsState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TIngredient[];
};

export const initialState: TIngredientsState = {
  isLoading: true,
  error: null,
  data: []
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
  selectors: {
    selectIngredients: (state) => state.data
  }
});

export const { selectIngredients } = ingredientsSlice.selectors;
