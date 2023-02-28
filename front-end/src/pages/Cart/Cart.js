import React, { useEffect } from 'react';
import './cart.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  decreaseCart,
  addToCart,
  clearCart,
  getTotals,
} from '../../redux/Slices/cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart.cartItems, dispatch]);
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleDecreaseCart = (item) => {
    dispatch(decreaseCart(item));
  };
  const handleIncreaseCart = (item) => {
    dispatch(addToCart(item));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const checkoutHandle = () => {
    navigate('/shipping');
  };
  return (
    <section className="cart_container">
      {cart.cartItems.length === 0 ? (
        <div>
          <h2>Your cart is currently empty.</h2>
          <div className="continue_shopping justify-content-center align-items-center gap-2 d-flex">
            <i className="ri-arrow-left-line fs-4"></i>
            <Link to="/">Go to Shopping</Link>
          </div>
        </div>
      ) : (
        <div>
          <h2>Shopping Cart</h2>
          <div className="">
            <div className="cart_titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart_items">
              {cart.cartItems &&
                cart.cartItems.map((item, index) => (
                  <div className="cart_item" key={index}>
                    <div className="cart_product">
                      <img src={item.image.url} alt={item.name} />
                      <div className="cart_product-title">
                        <h3>{item.name}</h3>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart_product-price">${item.price}</div>
                    <div className="cart_product-quantity">
                      <button
                        className="count"
                        onClick={() => handleDecreaseCart(item)}
                      >
                        -
                      </button>
                      <div>{item.cartQuantity}</div>
                      <button
                        className="count"
                        onClick={() => handleIncreaseCart(item)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart_product-total-price">
                      ${item.price * item.cartQuantity}
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart_summary">
              <button className="clear-btn" onClick={() => handleClearCart()}>
                Clear Cart
              </button>
              <div className="cart_checkout">
                <div className="subtotal">
                  <span>Subtotal: </span>
                  <span className="amount">$ {cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>

                <div className="checkout">
                  {auth._id ? (
                    <button
                      className="cart_login-to-checkout"
                      onClick={checkoutHandle}
                    >
                      Check out
                    </button>
                  ) : (
                    <button
                      className="cart_login-to-checkout"
                      onClick={() => navigate('/login')}
                    >
                      Login to Check out
                    </button>
                  )}

                  <div className="continue_shopping">
                    <i className="ri-arrow-left-line"></i>
                    <Link to="/">Coutinue Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
