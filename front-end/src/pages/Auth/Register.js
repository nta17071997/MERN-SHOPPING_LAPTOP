import React, {  useState } from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch} from 'react-redux';
import { registerUser } from '../../redux/Slices/authSlice';

import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
    navigate('/');
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <h2 className="card-title text-center">REGISTER</h2>
            <div className="card-body py-md-4">
              <form _lpchecked={1} onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <Link to="/login">Login</Link>
                  <motion.button
                    whileHover={{ scale: 0.9 }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Create Account
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
