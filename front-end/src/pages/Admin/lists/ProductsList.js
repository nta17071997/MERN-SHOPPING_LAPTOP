import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './productsList.scss'

import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';
import { Link, useNavigate } from "react-router-dom";
import { productDelete, productsFetchAdmin } from '../../../redux/Slices/productsSlice';

const ProductsList = () => {
    const { productsAdmin } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const deleteUserHandler = (id) => {
    dispatch(productDelete(id));
    navigate('/admin/products') 
  };

  useEffect(() => {
   
    dispatch(productsFetchAdmin());
    
  }, [dispatch,navigate]);
  const rows =
  productsAdmin &&
  productsAdmin.map((item) => {
      return {
        id: item._id,
        image: item.image.url,
        name: item.name,
        price: item.price,
        desc: item.desc,
      };
    });
  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 100, flex: 0.5 },

    {
      field: 'image',
      headerName: 'Image',
      minWidth: 20,
      flex: 0.3,
      renderCell: (params) => <img src={params.value} alt=""/>,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 60,
      flex: 0.5,
    },
    {
        field: 'price',
        headerName: 'Price',
        minWidth: 20,
        flex: 0.3,
      },
      {
        field: 'stock',
        headerName: 'Stock',
        minWidth: 20,
        flex: 0.3,
      },
      {
        field: 'desc',
        headerName: 'Description',
        minWidth: 40,
        flex: 0.5,
      },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 120,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/products/edit-product/${params.getValue(params.id, 'id')}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, 'id'))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div className="dashboard">
        <div className="productListContainer" >
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;
