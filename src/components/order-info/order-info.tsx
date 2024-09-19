import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchOrder } from '../../services/slices/orders/orderSlice';
import { fetchIngredients } from '../../services/slices/ingredients/index';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const [orders, setOrder] = useState<Array<TOrder>>([]);

  const { number } = useParams<{ number: string }>();

  const ingredients = useSelector((state) => state.ingredients.data);

  /*const orderData  = useSelector(
    (state) => state.burger.orderModalData
  );*/

  console.log(ingredients);

  useEffect(() => {
    getOrderByNumberApi(Number(number)).then((response) => {
      setOrder(response.orders);
    });
  }, [number]);
  const orderData = orders.find((item) => item.number === Number(number));
  console.log(orderData);
  /// Готовим данные для отображения
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
