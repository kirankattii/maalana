import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './AdminOrderDetails.scss';

const OrderDetails = () => {
  const order = {
    id: '123456',
    date: '2024-07-15',
    status: 'Shipped',
    totalAmount: 120.75,
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      image: 'https://via.placeholder.com/150'
    },
    shippingAddress: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
      country: 'USA'
    },
    payment: {
      method: 'Credit Card',
      last4: '1234',  // Only the last 4 digits of the card number
      status: 'Paid'
    },
    products: [
      {
        name: 'Product 1',
        image: 'https://via.placeholder.com/100',
        weight: '1kg',
        qty: 2,
        price: 50
      },
      {
        name: 'Product 2',
        image: 'https://via.placeholder.com/100',
        weight: '500g',
        qty: 1,
        price: 20.75
      }
    ]
  };

  useEffect(() => {
    // Change the body background color when the component mounts
    document.body.style.backgroundColor = '#f5f5f5';

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
   <div className="order-details-container">
     <Card className="order-details-card">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton onClick={() => window.history.back()}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" className="header-title">Order Details</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box className="section" sx={{ height: '20vh' }}>
              <Typography variant="h6" className="section-title">Order Details</Typography>
              <Typography variant="body1">Order ID: {order.id}</Typography>
              <Typography variant="body1">Order Date: {order.date}</Typography>
              <Typography variant="body1">Order Status: {order.status}</Typography>
              <Typography variant="body1">Total Amount: ${order.totalAmount.toFixed(2)}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="section" sx={{ height: '20vh' }}>
              <Typography variant="h6" className="section-title">User Details</Typography>
              <Box display="flex" alignItems="center">
                <img src={order.user.image} alt="User" className="user-image" />
                <Box ml={2}>
                  <Typography variant="body1">Name: {order.user.name}</Typography>
                  <Typography variant="body1">Email: {order.user.email}</Typography>
                  <Typography variant="body1">Phone: {order.user.phone}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="section" sx={{ height: '20vh' }}>
              <Typography variant="h6" className="section-title">Shipping Address</Typography>
              <Typography variant="body1">{order.shippingAddress.street}</Typography>
              <Typography variant="body1">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</Typography>
              <Typography variant="body1">{order.shippingAddress.country}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="section" sx={{ height: '20vh' }}>
              <Typography variant="h6" className="section-title">Payment Details</Typography>
              <Typography variant="body1">Payment Method: {order.payment.method}</Typography>
              <Typography variant="body1">Card Number: **** **** **** {order.payment.last4}</Typography>
              <Typography variant="body1">Payment Status: {order.payment.status}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className="section">
              <Typography variant="h6" className="section-title">Products</Typography>
              {order.products.map((product, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <Box ml={2}>
                    <Typography variant="body1">{product.name}</Typography>
                    <Typography variant="body1">Weight: {product.weight}</Typography>
                    <Typography variant="body1">Quantity: {product.qty}</Typography>
                    <Typography variant="body1">Price: ${product.price.toFixed(2)}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
   </div>
  );
};

export default OrderDetails;
