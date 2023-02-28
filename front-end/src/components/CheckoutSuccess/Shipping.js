import React, { Fragment, useState } from 'react';
import './shipping.scss';
import PinDropIcon from '@material-ui/icons/PinDrop';
import HomeIcon from '@material-ui/icons/Home';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PhoneIcon from '@material-ui/icons/Phone';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../redux/Slices/cartSlice';

const Shipping = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shippingSubmit = (e) => {
    e.preventDefault();
    const infoUser = {
      address,
      city,
      pinCode,
      phoneNo,
    };
    console.log(address, city, pinCode, phoneNo);
    dispatch(saveShippingInfo(infoUser));
    navigate('/order/confirm');
  };
  return (
    <Fragment>
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>
            <input type="submit" value="Continue" className="shippingBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
