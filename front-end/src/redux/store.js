import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/cartSlice';
import productsReducer from './Slices/productsSlice';
import usersReducer from './Slices/usersSlice';
import ordersReducer from './Slices/orderSlice';
import { getTotals } from './Slices/cartSlice';
import authReducer, { loadUser } from './Slices/authSlice';


const store = configureStore({
  reducer: {
    products: productsReducer,
    users:usersReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer
  },
});


store.dispatch(getTotals());
store.dispatch(loadUser(null));
export default store;
