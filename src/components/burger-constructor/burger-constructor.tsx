import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { resetOrderModalData } from '../../services/slices/constructor/burgerConstructorSlice';
import { createOrder } from '../../services/slices/orders/orderSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
const dispatch = useDispatch();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const  constructorItems  = useSelector((state) => state.burger.constructorItems)
const navigate = useNavigate();
  const orderRequest = useSelector(state => state.burger.orderRequest); 
  const isLogin = useSelector(state => state.user.isAuthenticated)
  

  const orderModalData = useSelector((state) => state.burger.orderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isLogin){
      const page = '/';
      navigate('/login', {state: {page}})
    }

    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(data));

  };
  const closeOrderModal = () => {
    dispatch(resetOrderModalData())
  };


  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick} 
      closeOrderModal={closeOrderModal}
    />
  );
};