import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { useNavigate, useParams } from 'react-router-dom';

import { url } from '../../../redux/Slices/api';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import './editProduct.scss';
import axios from 'axios';
import { productEdit } from '../../../redux/Slices/productsSlice';
const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    desc: '',
    brand: '',
    image: '',
    stock: '',
  });
  const [oldImages, setOldImages] = useState('');
  const brands = ['Samsung', 'Iphone', 'Xiaomi', 'Other'];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${url}/products/find/${params.id}`);

        setProduct(res.data);
        setOldImages(res.data.image.url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [params.id]);

  const updateProductImagesChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProduct({ ...product, image: reader.result });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    if (product.image === '') {
      return { ...product, image: oldImages.url };
    }

    dispatch(productEdit(product));
    navigate('/admin/products');
  };
  return (
    <Fragment>
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={updateProductSubmitHandler}
        >
          <h1 className="text-center">Edit Product</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              value={product.price}
            />
          </div>

          <div>
            <DescriptionIcon />

            <textarea
              placeholder="Product Description"
              value={product.desc}
              onChange={(e) => setProduct({ ...product, desc: e.target.value })}
              cols="30"
              rows="1"
            ></textarea>
          </div>

          <div>
            <AccountTreeIcon />
            <select
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
            >
              <option value="">Choose Category</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <StorageIcon />
            <input
              type="number"
              placeholder="Stock"
              required
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
              value={product.stock}
            />
          </div>

          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={updateProductImagesChange}
              multiple
            />
          </div>

          <div id="createProductFormImage"></div>

          <Button id="createProductBtn" type="submit">
            Update
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default EditProduct;
