import React, {  useEffect, useState } from 'react';
import './home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addToCart } from '../../redux/Slices/cartSlice';
import { productsFetch } from '../../redux/Slices/productsSlice';
import Carousel from '../../components/Carousel/Carousel';
import Pagination from 'react-js-pagination';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, productsCount, resultPerPage } =
    useSelector((state) => state.products);
  
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(productsFetch({ keyword, currentPage }));
  }, [dispatch, keyword, currentPage]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="home-container">
      <Carousel></Carousel>
      <div>
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
      <section className="home_section" id="container">
        <h2>New Arrivals</h2>
        <div className="products ">
          {items.map((product, index) => (
            <div key={index} className="product">
              <div className="product_img">
                <motion.img
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 0.9 }}
                  src={product.image.url}
                  alt={product.name}
                />
              </div>
              <Link to={`/product/${product._id}`}>
                <span>{product.name}</span>
              </Link>
              <div className="details">
                <span className="price">$ {product.price}</span>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAddToCart(product)}
                >
                  <i className="ri-add-circle-line"></i>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      
    </div>
  );
};

export default Home;
