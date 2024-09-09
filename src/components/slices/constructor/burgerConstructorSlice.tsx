// createSlice.js
import { TConstructorIngredient, TOrder, TIngredient } from '@utils-types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

 interface constructorState {
    constructorItems: {
      bun: TIngredient | null;
      ingredients: TConstructorIngredient[];
    };
    orderRequest: boolean;
    orderModalData: TOrder | null;
  }

 const initialState: constructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
  }

  
  
  export const burgerConstructorSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        /*addIngredient: (state, action:PayloadAction<TConstructorIngredient>) => {
          state.constructorItems.ingredients.push(action.payload);
        },*/
        addIngredient: {
          prepare: (payload: TIngredient) => ({
            payload: { ...payload, id: uuidv4() } 
          }),
          reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
            state.constructorItems.ingredients.push(action.payload);
          }
        },
      removeIngredient: (state, action: PayloadAction<number>) => {
        state.constructorItems.ingredients.splice(action.payload, 1);
      },
      setBun: (state, action: PayloadAction<TIngredient>) => {
        state.constructorItems.bun = action.payload;},
      
      setOrderRequest: (state, action: PayloadAction<boolean>) => {
        state.orderRequest = action.payload;
      },
      setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
        state.orderModalData = action.payload;
      },
      moveIngredientDown: (state, action) => {
        [
          state.constructorItems.ingredients[action.payload],
          state.constructorItems.ingredients[action.payload + 1]
        ] = [
          state.constructorItems.ingredients[action.payload + 1],
          state.constructorItems.ingredients[action.payload]
        ];
      },
      moveIngredientUp: (state, action) => {
        [
          state.constructorItems.ingredients[action.payload],
          state.constructorItems.ingredients[action.payload - 1]
        ] = [
          state.constructorItems.ingredients[action.payload - 1],
          state.constructorItems.ingredients[action.payload]
        ];
      },
      resetOrderModalData(state) {
        state.orderModalData = null;
      }
    },
  });

  export const {
    addIngredient,
    removeIngredient,
    setBun,
    setOrderRequest,
    setOrderModalData,
    moveIngredientDown,
    moveIngredientUp,
    resetOrderModalData
  } = burgerConstructorSlice.actions;

