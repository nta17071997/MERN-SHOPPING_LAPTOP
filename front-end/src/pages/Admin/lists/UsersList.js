import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';
import { deleteUser, usersFetch } from '../../../redux/Slices/usersSlice';
import { Link, useNavigate } from "react-router-dom";

const UsersList = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
    navigate('/admin/users')
  };

  useEffect(() => {
    dispatch(usersFetch());
    
  }, [dispatch,navigate]);
  const rows =
    users &&
    users.map((user) => {
      return {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.isAdmin,
      };
    });
  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 160, flex: 0.8 },

    {
      field: 'email',
      headerName: 'Email',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      minWidth: 120,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, 'role') === 'isAdmin'
          ? 'greenColor'
          : 'redColor';
      },
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
            <Link to={`/admin/users/edit-user/${params.getValue(params.id, 'id')}`}>
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
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={3}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
