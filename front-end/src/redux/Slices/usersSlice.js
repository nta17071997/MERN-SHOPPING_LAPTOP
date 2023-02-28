import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setHeaders, url } from './api.js';

const initialState = {
  users: [],
  user: [],
  status: null,
};

export const usersFetch = createAsyncThunk(
  'users/usersFetch',
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/users`, setHeaders());

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserDetails = createAsyncThunk(
  'users/getUserDetails',
  async (id) => {
    try {
      const response = await axios.get(`${url}/users/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  try {
    const response = await axios.delete(`${url}/users/${id}`, setHeaders());
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (values) => {
    try {
     
      const response = await axios.put(
        `${url}/users/${values._id}`,
        values
        
      );
      
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateUserAdmin = createAsyncThunk(
  'users/updateUser',
  async (values) => {
    try {
      
      const response = await axios.put(
        `${url}/users/admin/${values._id}`,
        values
        
      );
      
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state, action) => {
      state.status = 'pending';
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.status = 'success';
    },
    [usersFetch.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [getUserDetails.pending]: (state, action) => {
      state.status = 'pending';
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.status = 'success';
    },
    [getUserDetails.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [updateUser.pending]: (state, action) => {
      state.status = 'pending';
    },
    [updateUser.fulfilled]: (state, action) => {
      
      const updatedUser = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      state.users = updatedUser;
      state.status = 'success';
    },
    [updateUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [deleteUser.pending]: (state, action) => {
      state.status = 'pending';
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.status = 'success';
    },
    [deleteUser.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
