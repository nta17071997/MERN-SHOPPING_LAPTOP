import React, { Fragment } from 'react';


import './carousel.scss';

export default function App() {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>Scroll</button>
          <i className="ri-mouse-line"></i>
        </a>
      </div>
    </Fragment>
  );
}
