import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import './dashboard.scss';

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  if (!auth.isAdmin) return <p>Access denied</p>;
  return (
    <div className="">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-4 col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-81">
              <ul
                className="nav nav-pills gap-4 flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li>
                  <span className="ms-1 mb-4 d-none d-sm-inline ">
                    Dashboard
                  </span>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'link-active' : 'link-inactive'
                    }
                    to="/admin/products"
                  >
                    <i className="ri-smartphone-line"></i>
                    <span className="ms-1 d-none d-sm-inline">Products</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'link-active' : 'link-inactive'
                    }
                    to="/admin/users"
                  >
                    <i className="ri-team-line"></i>
                    <span className="ms-1 d-none d-sm-inline">Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'link-active' : 'link-inactive'
                    }
                    to="/admin/orders"
                  >
                    <i className="ri-shopping-basket-line"></i>
                    <span className="ms-1 d-none d-sm-inline">Orders</span>
                  </NavLink>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <div className="content col-10 p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
