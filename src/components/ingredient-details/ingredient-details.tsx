import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation } from 'react-router-dom';
import  {useSelector}  from '../../services/store';
import {selectIngredients} from '../../services/slices/ingredients/index'
import { useParams } from 'react-router-dom';


export const IngredientDetails: FC = () => {
 /* const location = useLocation().pathname.replace('/ingredients/', '').replace(/\s+/g, '').trim();*/

  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();

  const ingredientData = useSelector((state) =>
    state.ingredients.data.find((ingredient) => ingredient._id === id)
  );

  if (!ingredientData) {
    return <Preloader />; 
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
