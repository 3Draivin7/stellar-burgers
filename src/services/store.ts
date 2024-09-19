import { combineReducers, Reducer } from 'redux';
import { UnknownAction, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsSlice } from './slices/ingredients';
import { userSlice } from './slices/user';
import { feedSlice } from './slices/feed/feedSlice';
import { burgerConstructorSlice } from './slices/constructor/burgerConstructorSlice';
import { orderSlice } from './slices/orders/orderSlice';

import { TIngredientsState } from './slices/ingredients';
import { TUserState } from './slices/user';
import { TFeedsState } from './slices/feed/feedSlice';
import { constructorState } from './slices/constructor/burgerConstructorSlice';
import { TOrdersState } from './slices/orders/orderSlice';

// Удалите закомментированный тип RootState

export type RootState = {
  ingredients: TIngredientsState;
  user: TUserState;
  feed: TFeedsState;
  burger: constructorState;
  order: TOrdersState;
};

export const rootReducer: Reducer<
  RootState,
  UnknownAction,
  Partial<RootState>
> = combineReducers({
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

// Правильное определение RootState
//export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
