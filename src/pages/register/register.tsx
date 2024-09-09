/*import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
*/

import { FC, SyntheticEvent, useState, useEffect } from 'react'; 
import { RegisterUI } from '@ui-pages'; 
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from '../../services/store'; 
import { register } from '../../components/slices/user'; 

export const Register: FC = () => { 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const { registerError } = useSelector((state) => state.user); 

  const [userName, setUserName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Очистка ошибки при каждом изменении email, userName или password
    setErrorMessage(registerError?.message || '');
  }, [registerError, email, userName, password]);



  const handleSubmit = async (e: SyntheticEvent) => { 
    e.preventDefault();
    setErrorMessage(''); // Сбрасываем сообщение об ошибке

    try { 
      await dispatch(register({ name: userName, email, password })).unwrap(); 
      navigate('/profile', { replace: true }); 
    } catch (error) {
      setErrorMessage(registerError?.message || 'Произошла ошибка при регистрации.');
    } 
  }; 

  return ( 
    <RegisterUI 
      errorText={errorMessage} 
      email={email} 
      userName={userName} 
      password={password} 
      setEmail={setEmail} 
      setPassword={setPassword} 
      setUserName={setUserName} 
      handleSubmit={handleSubmit} 
    /> 
  ); 
}; 
