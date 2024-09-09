import { ConstructorPage,Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  IngredientDetails,
  Modal,
  OrderInfo,
  AppHeader
} from '@components';
import {ProtectedRoute} from '../protectedRoute/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {Login,Register,ForgotPassword,ResetPassword,Profile,ProfileOrders,NotFound404} from '@pages'
import {  fetchIngredients } from '../slices/ingredients';
import { fetchUser } from '../slices/user'

export const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [dispatch]);

  const location = useLocation();
  const background = location.state && location.state.background;
  console.log(localStorage)

const isAuthenticated =  useSelector((state) => state.user.isAuthenticated); ;
 return (
  <div className={styles.root}>
    <AppHeader />
        <Routes  location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute isAuthenticated={true}>
                <Login />
             </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute isAuthenticated={true}>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute isAuthenticated={true}>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound404 />} />
        </Routes>      
        {background && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Детали ингредиента' onClose={closeModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
        {background && (
          <Routes>
            <Route
              path='/feed/:number'
              element={
                <Modal title='Детали заказа' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
        {background && (
          <Routes>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title='Детали заказа' onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
  </div>
  );
};


