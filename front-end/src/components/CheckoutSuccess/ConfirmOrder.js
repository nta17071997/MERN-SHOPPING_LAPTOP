import React, { Fragment } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import './ConfirmOrder.scss';
import { Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../redux/Slices/orderSlice';
import { clearCart } from '../../redux/Slices/cartSlice';

const ConfirmOrder = () => {
  const { cartItems, cartTotalAmount, shippingInfo } = useSelector(
    (state) => state.cart
  );
  const { name, email, _id } = useSelector((state) => state.auth);
  const user = {
    name: name,
    email: email,
    _id: _id,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const proceedToPayment = () => {
    dispatch(createOrder({ shippingInfo, cartItems, cartTotalAmount, user }));
    dispatch(clearCart());
    navigate('/order/payment');
  };
  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{shippingInfo.address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image.url} alt="Product" />
                    <Link to={`/product/${item._id}`}>{item.name}</Link>{' '}
                    <span>
                      {item.cartQuantity} X ${item.price} ={' '}
                      <b>${item.price * item.cartQuantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>$subtotal</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>$shippingCharges</span>
              </div>
              <div>
                <p>GST:</p>
                <span>$tax</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>$ {cartTotalAmount}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
