import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
  TLoginData, 
  TRegisterData, 
  getUserApi, 
  loginUserApi, 
  logoutApi, 
  registerUserApi, 
  updateUserApi 
} from '@api';
import { TUser } from '@utils-types'; 
import { deleteCookie, setCookie } from '../../../utils/cookie';

type TUserState = {  
  isAuthChecked: boolean;  
  isAuthenticated: boolean;  
  loginError?: SerializedError;  
  registerError?: SerializedError;  
  data: TUser;  
  isLoading: boolean; // Добавлено isLoading
};  
 
const initialState: TUserState = {  
  isAuthChecked: false,  
  isAuthenticated: false,  
  data: { name: '', email: '' },
  isLoading: false // Добавлено начальное состояние isLoading
}; 
 
interface AsyncAction<T, E> { 
    type: string; 
    payload?: T; 
    error?: E; 
    meta: { 
        requestId: string; 
        rejectedWithValue?: boolean; 
    }; 
} 
 
const clearTokens = () => { 
    localStorage.removeItem('refreshToken'); 
    deleteCookie('accessToken'); 
  }; 
 
type Action = AsyncAction<SerializedError | TUser, unknown>; 
 
export const register = createAsyncThunk<TUser, TRegisterData>( 
  'user/register',  
  async (data, { rejectWithValue }) => { 
    const response = await registerUserApi(data); 
    if (!response?.success) return rejectWithValue(response); 
     
    const { user, refreshToken, accessToken } = response; 
    storeTokens(refreshToken, accessToken); 
     
    return user;  
  } 
); 
 
export const login = createAsyncThunk<TUser, TLoginData>( 
    'user/login', 
    async (data, { rejectWithValue }) => { 
      const response = await loginUserApi(data); 
   
      if (!response?.success) { 
        return rejectWithValue(response); 
      } 
      const { user, refreshToken, accessToken } = response; 
      storeTokens(refreshToken, accessToken); 
      return user; 
    } 
  ); 
 
export const logout = createAsyncThunk( 
  'user/logout',  
  async (_, { rejectWithValue }) => { 
    const response = await logoutApi(); 
    if (!response?.success) return rejectWithValue(response); 
    clearTokens(); 
    console.log(localStorage) 
  } 
); 
 
export const fetchUser = createAsyncThunk( 
  'user/fetch',  
  async (_, { rejectWithValue }) => { 
    const response = await getUserApi(); 
    if (!response?.success) return rejectWithValue(response); 
 
    return response.user;  
  } 
); 
 
/*function refreshToken = () => { 
    return request('auth/token', { 
        method: 'POST', 
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }), 
    }); 
};*/ 
 
 const storeTokens = (refreshToken: string, accessToken: string) => { 
    localStorage.setItem('refreshToken', String(refreshToken)); 
   
    setCookie('accessToken', String(accessToken)); 
  };
  export const userSlice = createSlice({  
    name: 'user',  
    initialState,  
    reducers: {},  
    extraReducers: (builder) => {  
      builder 
        .addCase(register.pending, (state) => { 
          state.registerError = undefined;
          state.isLoading = true; // Установите isLoading в true при ожидании
        }) 
        .addCase(register.fulfilled, (state, action) => { 
          state.registerError = undefined; 
          state.isAuthenticated = true; 
          state.data = action.payload; 
          state.isLoading = false; // Установите isLoading в false при выполнении
        }) 
        .addCase(register.rejected, (state, action) => { 
          state.registerError = action.meta.rejectedWithValue ? (action.payload as SerializedError) : action.error; 
          state.isLoading = false; // Установите isLoading в false при отмене
        }) 
        .addCase(login.pending, (state) => { 
          state.loginError = undefined; 
          state.isLoading = true; // Установите isLoading в true при ожидании
        }) 
        .addCase(login.fulfilled, (state, action) => { 
          state.loginError = undefined; 
          state.isAuthenticated = true; 
          state.data = action.payload; 
          state.isLoading = false; // Установите isLoading в false при выполнении
        }) 
        .addCase(login.rejected, (state, action) => { 
          state.loginError = action.meta.rejectedWithValue ? (action.payload as SerializedError) : action.error; 
          state.isLoading = false; // Установите isLoading в false при отмене
        }) 
        .addCase(logout.fulfilled, (state) => { 
          state.isAuthenticated = false; 
          state.data = { email: '', name: '' }; 
          state.isLoading = false; // Установите isLoading в false при выполнении
        }) 
        .addCase(fetchUser.pending, (state) => {
          state.isLoading = true; // Установите isLoading в true при ожидании
        }) 
        .addCase(fetchUser.fulfilled, (state, action) => { 
          state.isAuthenticated = true; 
          state.isAuthChecked = true; 
          state.data = action.payload; 
          state.isLoading = false; // Установите isLoading в false при выполнении
        }) 
        .addCase(fetchUser.rejected, (state) => { 
          state.isAuthChecked = true; 
          state.isLoading = false; // Установите isLoading в false при отмене
        }) 
    },
  });


