import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {  url } from './api.js';
import { toast } from 'react-toastify';

const initialState = {
    orders: [],
    status: null,
};

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (values, { rejectWithValue }) => {
      try {
       
        const response = await axios.post(`${url}/orders`, values);
        console.log(response.data)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers:{
      [createOrder.pending]: (state, action) => {
        state.status = 'pending';
      },
      [createOrder.fulfilled]: (state, action) => {
        state.orders.push(action.payload);
        state.status = 'success';
        toast.success('Product Created!');
      },
      [createOrder.rejected]: (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      },
    }

  })
  export default orderSlice.reducer;