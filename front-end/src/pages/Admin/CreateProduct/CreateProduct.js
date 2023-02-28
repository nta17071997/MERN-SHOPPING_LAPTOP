import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productsCreate } from '../../../redux/Slices/productsSlice';
import '../dashboard.scss';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productImg, setProductImg] = useState('');
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFileData(file);
  };
  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productsCreate({
        name,
        price,
        brand,
        desc,
        image: productImg,
      })
    );
    navigate('/admin/products');
  };

  return (
    <div className="create_product mt-3">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center mb-2">Create a Product</h3>
        <input
          className="form-control mb-4"
          id="imgUpload"
          accept="image/*"
          type="file"
          onChange={handleProductImageUpload}
          required
        />
        <input
          className="form-control mb-4"
          type="text"
          placeholder="Name product"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="form-control mb-4"
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          className="form-control mb-4"
          type="text"
          placeholder="Short Description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <select
          className="form-select mb-4"
          onChange={(e) => setBrand(e.target.value)}
          required
        >
          <option value="">Select Brand</option>
          <option value="iphone">iPhone</option>
          <option value="samsung">Samsung</option>
          <option value="xiomi">Xiaomi</option>
          <option value="other">Other</option>
        </select>
        <div className="text-center">
          <button className="create_submit " type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
