import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import NotFound from './components/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Admin/Dashboard';
import Products from './pages/Admin/Products';
import Summary from './pages/Admin/Summary';
import Orders from './pages/Admin/Orders';
import Users from './pages/Admin/Users';
import CreateProduct from './pages/Admin/CreateProduct/CreateProduct';
import ProductsList from './pages/Admin/lists/ProductsList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import UserProfile from './pages/UserProfile/UserProfile';

import UsersList from './pages/Admin/lists/UsersList';
import Shipping from './components/CheckoutSuccess/Shipping';
import ConfirmOrder from './components/CheckoutSuccess/ConfirmOrder';
import Payment from './components/CheckoutSuccess/Payment';
import UpdateProfile from './pages/UserProfile/UpdateProfile';
import EditUser from './pages/Admin/EditUser/EditUser';

import OrdersList from './pages/Admin/lists/OrdersList';
import EditProduct from './pages/Admin/EditProduct/EditProduct'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          closeOnClick
          pauseOnHover
          theme="dark"
        />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />}></Route>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/order/payment" element={<Payment />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/:id" element={<UpdateProfile />} />
          <Route exact path="/admin" element={<Dashboard />}>
            <Route exact path="products" element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
            </Route>
            <Route path="summary" element={<Summary />} />
            <Route path="orders" element={<Orders />} >
              <Route index element={<OrdersList />} />
              
            </Route>
            <Route path="users" element={<Users />}>
              <Route index element={<UsersList />} />
             
              <Route path="edit-user/:id" element={<EditUser />} />
            </Route>
          </Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
