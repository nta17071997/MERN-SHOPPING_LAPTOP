import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingInfo: [],
  cartTotalQuantity: localStorage.getItem('cartTotalQuantity')
    ? JSON.parse(localStorage.getItem('cartTotalQuantity'))
    : 0,
  cartTotalAmount: localStorage.getItem('cartTotalAmount')
  ? JSON.parse(localStorage.getItem('cartTotalAmount'))
  : 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info('Increased product quantity');
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to cart`);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const removeCartItem = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.cartItems = removeCartItem;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} removed from cart`);
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(`Decreased ${action.payload.name} cart quantity`);
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const removeCartItem = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.cartItems = removeCartItem;
        toast.error(`${action.payload.name} removed from cart`);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      toast.error('Cart cleared');
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
      localStorage.setItem(
        'cartTotalQuantity',
        JSON.stringify(state.cartTotalQuantity)
      );
    },

    saveShippingInfo(state, action) {
      return {
        ...state,
        shippingInfo: action.payload,
      };
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
  saveShippingInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
