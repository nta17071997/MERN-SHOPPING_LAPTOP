import React, { Fragment } from 'react';
import CheckoutSteps from './CheckoutSteps';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import './Payment.scss';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Payment = () => {
  return (
    <Fragment>
      <CheckoutSteps activeStep={2} />
      <div className="orderSuccess">
        <CheckCircleIcon />

        <Typography>Your Order has been Placed successfully </Typography>
        <Link to="/orders">View Orders</Link>
      </div>
    </Fragment>
  );
};

export default Payment;
