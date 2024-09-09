import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation } from 'react-router-dom';
import  {useSelector}  from '../../services/store';
import {selectIngredients} from '../slices/ingredients/index'


export const IngredientDetails: FC = () => {
  const location = useLocation().pathname.replace('/ingredients/', '').replace(/\s+/g, '').trim();

  /** TODO: взять переменную из стора */
  const ingredientData = useSelector(selectIngredients);
  const trueEngredient = ingredientData.filter((ingredient) => ingredient?._id === location);


  if (!ingredientData) {
    return <Preloader />; 
  }

  return <IngredientDetailsUI ingredientData={trueEngredient[0]} />;
};
