import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store'
import { moveIngredientDown,  moveIngredientUp, removeIngredient } from '../slices/constructor/burgerConstructorSlice';


export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {

const dispatch = useDispatch();
console.log(index);
const handleMoveDown = () => {
  dispatch(moveIngredientDown(index));
};

const handleMoveUp = () => {
  dispatch(moveIngredientUp(index));
};

const handleClose = () => {
  dispatch(removeIngredient(parseInt(ingredient.id, 10))); 
}

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
