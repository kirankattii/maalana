import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Box, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import './ProductDetails.scss'; // Import the SCSS file

const ProductDetails = () => {
  const product = {
    name: 'Deluxe Chocolate Bar',
    description: 'A rich and creamy chocolate bar made from the finest cocoa beans.',
    price: 12.99,
    rating: 4, // Assuming out of 5 stars
    reviewsCount: 120,
    imageMain: 'https://via.placeholder.com/800x400.png',
    images: [
      'https://via.placeholder.com/80x80.png',
      'https://via.placeholder.com/80x80.png',
      'https://via.placeholder.com/80x80.png',
      'https://via.placeholder.com/80x80.png'
    ],
    ingredients: ['Cocoa Beans', 'Sugar', 'Milk Powder', 'Butter'],
    nutritional: {
      energy: 250,
      totalFat: 15,
      protein: 3,
      carbohydrates: 30,
      sugar: 20
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = '#f5f5f5';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <>
      <div className="product-details-container">
        <Card className="product-details-card">
          <CardContent>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <IconButton onClick={() => window.history.back()}>
                  <ArrowBackIcon fontSize="large" />
                </IconButton>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h4" className="header-title">Product Details</Typography>
              </Grid>
              <Grid item>
              <Tooltip title="Edit" arrow>
                <IconButton className="edit-button">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              </Grid>
            </Grid>
          </CardContent>

          {/* Main Content Section */}
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* Left Side: Images */}
                <Box>
                  <img src={product.imageMain} alt={product.name} className="product-image-main" />
                  <div className="thumbnail-images">
                    {product.images.map((img, index) => (
                      <img key={index} src={img} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
                    ))}
                  </div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* Right Side: Product Details */}
                <Box>
                  <Typography variant="h5" className="product-name">{product.name}</Typography>
                  <Typography variant="body1" className="description">{product.description}</Typography>
                  <Typography variant="body1" className="price">Price: ${product.price.toFixed(2)}</Typography>
                  <Box className="review-rating">
                    <div className="rating-stars">
                      {Array(product.rating).fill().map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <Typography variant="body2">({product.reviewsCount} reviews)</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" className="section-title">Ingredients</Typography>
                    <Typography variant="body1" className="section-content">
                      {product.ingredients.join(', ')}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" className="section-title">Nutritional Information</Typography>
                    <ul className="nutrient-list">
                      <li className="nutrient-item">Energy: {product.nutritional.energy} kcal</li>
                      <li className="nutrient-item">Total Fat: {product.nutritional.totalFat}g</li>
                      <li className="nutrient-item">Protein: {product.nutritional.protein}g</li>
                      <li className="nutrient-item">Carbohydrates: {product.nutritional.carbohydrates}g</li>
                      <li className="nutrient-item">Sugar: {product.nutritional.sugar}g</li>
                    </ul>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductDetails;
