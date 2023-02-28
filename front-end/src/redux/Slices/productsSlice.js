import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setHeaders, url } from './api.js';
import { toast } from 'react-toastify';
import queryStirng from 'query-string';

const initialState = {
  items: [],
  productsAdmin:[],
  productsCount: null,
  resultPerPage: null,
  status: null,
  error: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};

export const productsFetch = createAsyncThunk(
  'products/productsFetch',
  async (values, { rejectWithValue }) => {
    try {
      const paramsString = queryStirng.stringify(values);

      const response = await axios.get(`${url}/products?${paramsString}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const productsFetchAdmin = createAsyncThunk(
  'products/productsFetchAdmin',
  async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/admin`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const productsCreate = createAsyncThunk(
  'products/productsCreate',
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeaders()
      );

      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const productEdit = createAsyncThunk(
  'products/productEdit',
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values._id}`,
        values,
        setHeaders()
      );
      
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const productDelete = createAsyncThunk(
  'products/productDelete',
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = 'pending';
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.status = 'success';
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [productsFetchAdmin.pending]: (state, action) => {
      state.status = 'pending';
    },
    [productsFetchAdmin.fulfilled]: (state, action) => {
      state.productsAdmin = action.payload;
      state.status = 'success';
    },
    [productsFetchAdmin.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },

    [productsCreate.pending]: (state, action) => {
      state.createStatus = 'pending';
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.productsAdmin.push(action.payload);
      state.createStatus = 'success';
      toast.success('Product Created!');
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = 'rejected';
      state.error = action.payload;
    },
    [productDelete.pending]: (state, action) => {
      state.deleteStatus = 'pending';
    },
    [productDelete.fulfilled]: (state, action) => {
      const newList = state.productsAdmin.filter(
        (item) => item._id !== action.payload._id
      );
      state.productsAdmin = newList;
      state.deleteStatus = 'success';
      toast.success('Product Deleted!');
    },
    [productDelete.rejected]: (state, action) => {
      state.deleteStatus = 'rejected';
      state.error = action.payload;
    },
    [productEdit.pending]: (state, action) => {
      state.editStatus = 'pending';
    },
    [productEdit.fulfilled]: (state, action) => {
      
      const updatedProduct = state.productsAdmin.map((product) => 
       product._id === action.payload._id ? action.payload : product
      );
      state.productsAdmin = updatedProduct;
      state.editStatus = 'success';
      toast.info('Product Updated!');
    },
    [productEdit.rejected]: (state, action) => {
      state.editStatus = 'rejected';
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
