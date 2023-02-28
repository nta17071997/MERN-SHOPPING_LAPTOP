import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>Products</h2>
        <button onClick={() => navigate('/admin/products/create-product')}>
          Create
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Products;
