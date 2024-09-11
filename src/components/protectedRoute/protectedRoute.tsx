import React from 'react';
import { Navigate, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useSelector} from '../../services/store';
import { Preloader } from '../ui';
import { useParams } from 'react-router-dom';


interface ProtectedRouteProps {
  anonymous: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ anonymous, children }) => {

  const isLoggedIn = useSelector((store) => store.user.isAuthenticated);
  const location = useLocation();

  const from = location.state?.from;
  const user = useSelector(state => state.user.data)
  const page = location.state?.page


  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={ from } />;
  }
 

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;

};
