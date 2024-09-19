import { burgerConstructorSlice } from './burgerConstructorSlice';

describe('burgerConstructorSlice', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null
  };

  it('должен добавить ингредиент в конструктор', () => {
    const ingredient = {
      _id: '123',
      name: 'ингредиент1',
      type: 'main',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 200,
      price: 100,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: '123'
    };
    const action = burgerConstructorSlice.actions.addIngredient(ingredient);
    const newState = burgerConstructorSlice.reducer(initialState, action);
    expect(newState.constructorItems.ingredients).toEqual([
      { ...ingredient, id: expect.any(String) }
    ]);
  });

  it('должен удалить ингредиент из конструктора', () => {
    const ingredientId = '123';
    const initialStateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          {
            _id: '123',
            name: 'ингредиент1',
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
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            id: '123'
          }
        ]
      }
    };
    const action =
      burgerConstructorSlice.actions.removeIngredient(ingredientId);
    const newState = burgerConstructorSlice.reducer(
      initialStateWithIngredient,
      action
    );
    expect(newState.constructorItems.ingredients).toEqual([]);
  });
  it('должен переместить ингредиент вниз в конструкторе', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          {
            _id: '123',
            name: 'ингредиент1',
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
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            id: '123'
          },
          {
            _id: '123',
            name: 'ингредиент1',
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
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            id: '123'
          }
        ]
      }
    };
    const action = burgerConstructorSlice.actions.moveIngredientDown(0);
    const newState = burgerConstructorSlice.reducer(
      initialStateWithIngredients,
      action
    );
    expect(newState.constructorItems.ingredients).toEqual([
      {
        _id: '123',
        name: 'ингредиент1',
        type: 'main',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 200,
        price: 100,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: '123'
      },
      {
        _id: '123',
        name: 'ингредиент1',
        type: 'main',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 200,
        price: 100,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: '123'
      }
    ]);
  });

  it('должен переместить ингредиент вверх в конструкторе', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          {
            _id: '123',
            name: 'ингредиент1',
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
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            id: '123'
          },
          {
            _id: '123',
            name: 'ингредиент1',
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
              'https://code.s3.yandex.net/react/code/bun-02-large.png',
            id: '123'
          }
        ]
      }
    };
    const action = burgerConstructorSlice.actions.moveIngredientUp(1);
    const newState = burgerConstructorSlice.reducer(
      initialStateWithIngredients,
      action
    );
    expect(newState.constructorItems.ingredients).toEqual([
      {
        _id: '123',
        name: 'ингредиент1',
        type: 'main',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 200,
        price: 100,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: '123'
      },
      {
        _id: '123',
        name: 'ингредиент1',
        type: 'main',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 200,
        price: 100,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: '123'
      }
    ]);
  });
});
