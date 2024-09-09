import { configureStore, combineReducers, combineSlices } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {ingredientsSlice} from '../components/slices/ingredients';
import { userSlice } from '../components/slices/user';
import { feedSlice } from '../components/slices/feed/feedSlice';
import { burgerConstructorSlice } from '../components/slices/constructor/burgerConstructorSlice';
import { orderSlice } from '../components/slices/orders/orderSlice';
export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  user: userSlice.reducer,
  feed: feedSlice.reducer,
  burger: burgerConstructorSlice.reducer,
  order: orderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
