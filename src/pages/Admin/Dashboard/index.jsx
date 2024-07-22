import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

import './Dashboard.scss';

import { formatNumber } from '../../../utils/numberFormatter.js';

import OrderList from '../../../components/OrderList/index.jsx';
import BestSellerProducts from '../../../components/BestSellerProducts/index.jsx';

const Dashboard = () => {
  const [data, setData] = useState({
    allProducts: 0,
    inStock: 0,
    outOfStock: 0,
    users: 0,
    orders: 0,
  });

    // Example of data fetching function
    useEffect(() => {
      // Replace this with your data fetching logic
      const fetchData = async () => {
        // Mock data fetching
        const fetchedData = {
          allProducts: 10000,
          inStock: 150,
          outOfStock: 0,
          users: 1200,
          orders: 10000,
        };
        setData(fetchedData);
      };
  
      fetchData();
    }, []);

  return (
    <div className="dashboard-container">
      <Typography variant="h4" className="dashboard-header">Admin Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6">All Products</Typography>
              <Typography variant="h4">{formatNumber(data.allProducts)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6">In Stock/Out of Stock</Typography>
              <Typography variant="h4">{formatNumber(data.inStock)}/{formatNumber(data.outOfStock)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4">{formatNumber(data.users)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6">Orders</Typography>
              <Typography variant="h4">{formatNumber(data.orders)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <BestSellerProducts />
        <OrderList />
      </Grid>
    </div>
  );
};

export default Dashboard;
