import React, { Fragment, useEffect, useState } from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch } from 'react-redux';
import './UpdateProfile.scss';
import { updateUser } from '../../redux/Slices/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { setHeaders, url } from '../../redux/Slices/api';

const UpdateProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    avatar: '',
  });
  const [oldImages, setOldImages] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${url}/users/${params.id}`, setHeaders());
        setUser({
          ...res.data,
          password: '',
        });
        setOldImages(res.data.avatar.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [params.id]);

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUser({ ...user, avatar: reader.result });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    if (user.avatar === '') {
      return { ...user, avatar: oldImages };
    }
    dispatch(updateUser(user));
    navigate('/profile');
  };
  return (
    <Fragment>
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          <h2 className="updateProfileHeading">Update Profile</h2>

          <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="updateProfileEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="updateProfilePassword">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <div id="updateProfileImage">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <input type="submit" value="Update" className="updateProfileBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
