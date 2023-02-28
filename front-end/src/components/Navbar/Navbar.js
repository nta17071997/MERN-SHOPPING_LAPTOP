import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.scss';
import { logoutUser } from '../../redux/Slices/authSlice';
import avatar from '../../assets/avatar.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.users);
  console.log(auth,user)
  const navigate = useNavigate();
  
  useEffect(() => { 
    return;
  }, [auth.user]);
  const handleLogout = () => {
    dispatch(logoutUser(null));
    navigate('/');
  };
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>AShop</h2>
      </Link>
      <Link to="/cart">
        <div className="nav-bag">
          <i className="ri-shopping-cart-2-line"></i>
          <span className="bag-quantity">{cartTotalQuantity}</span>
        </div>
      </Link>
      {auth._id ? (
        <div className="links">
          <div className="info">
            <Link to="/profile">
              <img
                src={auth.avatar ? auth.avatar.url : avatar}
                alt=""
                className="avatar"
              />
            </Link>
            {auth.isAdmin ? (
              <Link to="/admin">Admin</Link>
            ) : (
              <p>Wellcome {auth.name} to Shop</p>
            )}
          </div>
          <Link className="logout" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="authLinks">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
