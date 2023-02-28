import React, { Fragment} from 'react';
import { useSelector } from 'react-redux';
import './userProfile.scss';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';


const UserProfile = () => {
  const auth= useSelector((state) => state.auth);
  
  return (
    <Fragment>
      <div className="profileContainer">
        <div className='profile_avatar'>
          <h1>My Profile</h1>
          <img src={auth.avatar ? auth.avatar.url : avatar} alt={auth.name} />
          <Link to={`/profile/${auth._id}`}>Edit Profile</Link>
        </div>
        <div className='profile_info'>
          <div>
            <h4>Full Name</h4>
            <p>{auth.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{auth.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String().substr(0, 10)}</p>
          </div>

          <div>
            <Link to="/orders">My Orders</Link>
            
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserProfile;
