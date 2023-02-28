import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { url } from './api';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const initialState = {
  token: localStorage.getItem('token'),
  name: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name :"",
  email: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email :"",
  isAdmin: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).isAdmin :"",
  _id: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))._id :"",
  avatar: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).avatar :"",
  createdAt: "",
  registerStatus: '',
  registerError: '',
  loginStatus: '',
  loginError: '',
  updateUserStatus: '',
  updateUserError: '',
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      localStorage.setItem('token', token.data);
      toast.success("Register Successfully.")
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      toast.warning(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (values, { rejectWithValue }) => {
    try {
      
      const token = await axios.post(`${url}/login`, {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem('token', token.data);
      localStorage.setItem('user', JSON.stringify(jwtDecode(token.data)));
      toast.success("Login Successfully.")
      return token.data;
    } catch (error) {
      console.log(error.response.data);
      toast.warning(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${url}/users/${values._id}`, values);
      localStorage.setItem('user', JSON.stringify(response.data));
      toast.success("Update User Successfully.")
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      toast.warning(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          avatar: user.avatar,
          userLoaded: true,
        };
      } else return { ...state, userLoaded: true };
    },
    logoutUser(state, action) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cartItems');
      localStorage.removeItem('cartTotalQuantity');
      return {
        token: '',
        name: '',
        email: '',
        _id: '',
        avatar:"",
       
        loginStatus: '',
        loginError: '',
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: 'pending' };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          avatar:user.avatar,
          _id: '',
          registerStatus: 'success',
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: 'rejected',
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, registerStatus: 'pending' };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
       
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          avatar: user.avatar,
          _id: user._id,
          registerStatus: 'success',
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: 'rejected',
        registerError: action.payload,
      };
    });

    builder.addCase(updateUser.pending, (state, action) => {
      return { ...state, updateUserStatus: 'pending' };
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
     
      if (action.payload) {
        return {
          ...state,
          name: action.payload.name,
          email: action.payload.email,
          isAdmin: action.payload.isAdmin,
          avatar: action.payload.avatar,
          
          _id: action.payload._id,
          createdAt: action.payload.createdAt,
          updateUserStatus: 'success',
        };
      } else return state;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      return {
        ...state,
        updateUserError: action.payload,
        updateUserStatus: 'rejected',
      };
    });
  },
});
export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
