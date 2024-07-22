import React, { useEffect, useState } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

//After login or signup
import Home from "./pages/Home/index.jsx";
import Cart from "./pages/Cart/index.jsx";
import Products from "./pages/Products/index.jsx";
import ProductDetail from "./pages/ProductDetail/index.jsx";

//Before login or signup
import Signup from "./pages/Signup/index.jsx";
import Login from "./pages/Login/index.jsx";
import BecomePartner from "./pages/BecomePartner/index.jsx";
import Profile from "./pages/profile/index.jsx";
import Contact from './pages/Contact/index.jsx';
import Landing from "./pages/Landing/index.jsx";

// admin
import AdminLogin from "./pages/Admin/Login/index.jsx";
import AdminDashboard from "./pages/Admin/Dashboard/index.jsx";


// common components AdminHeader
import AdminHeader from "./components/common/AdminHeader/index.jsx";
import AdminFooter from "./components/common/AdminFooter/index.jsx";

// admin components
import AddProduct from "./components/AddProduct/index.jsx";
import AddCategory from "./components/AddCategory/index.jsx";
import AdminProducts from "./components/AdminProducts/index.jsx";
import ProductDetails from "./components/ProductDetails/index.jsx";
import AdminOrderDetails from "./components/AdminOrderDetails/index.jsx";

const App = () => {
  const [productCart, setProductCart] = useState([]);

  useEffect(() => {
    AOS.init({});
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/api/get-all-cart', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       // Check if the response is ok (status code 200-299)
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       setProductCart(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  console.log(productCart.cart);
  return (
    <>
      <Router>
        <HeaderOrAdminHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/become-partner" element={<BecomePartner />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/product-details/:id" element={<ProductDetails />} />
          <Route path="/admin/order-details/:id" element={<AdminOrderDetails />} />
        </Routes>
        <FooterOrAdminFooter />
      </Router>
    </>
  );
};

const HeaderOrAdminHeader = () => {
  const location = useLocation();
  const adminPathsForProductDetail = location.pathname;
  const adminPaths = ["/admin/login", "/admin/dashboard", "/admin/add-product", "/admin/add-category", "/admin/products"];
console.log(adminPathsForProductDetail);
  if (location.pathname === "/admin/login") {
    return null;
  }

  return adminPaths.includes(location.pathname) ? <AdminHeader /> : <Header />;
};

const FooterOrAdminFooter = () => {
  const location = useLocation();
  console.log(location.pathname);
  const adminPathsForProductDetail = location.pathname;
  const adminPaths = ["/admin/login", "/admin/dashboard", "/admin/add-product", "/admin/add-category", "/admin/products"];

  if (location.pathname === "/admin/login") {
    return null;
  }

  return adminPaths.includes(location.pathname) ? <AdminFooter /> : <Footer />;
};


export default App;
