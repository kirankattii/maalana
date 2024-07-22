import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { PhotoCamera, Close as CloseIcon } from '@mui/icons-material';
import './AddProduct.scss';

const AddProduct = () => {
  const navigate = useNavigate();
  const [isMultiple, setIsMultiple] = useState(false);
  const [products, setProducts] = useState([{
    productName: '',
    productImage: null,
    price: '',
    quantity: '',
    description: '',
    ingredients: '',
    nutritionalInfo: '',
    frontImage: null,
    backImage: null,
    leftImage: null,
    rightImage: null,
    category: ''
  }]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSwitchChange = (event) => {
    setIsMultiple(event.target.checked);
    if (!event.target.checked) {
      setProducts([{
        productName: '',
        productImage: null,
        price: '',
        quantity: '',
        description: '',
        ingredients: '',
        nutritionalInfo: '',
        frontImage: null,
        backImage: null,
        leftImage: null,
        rightImage: null,
        category: ''
      }]);
    }
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const handleProductImageChange = (index, field, event) => {
    const newProducts = [...products];
    newProducts[index][field] = event.target.files[0];
    setProducts(newProducts);
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      if (isMultiple) {
        products.forEach((product, index) => {
          formData.append(`products[${index}].name`, product.productName);
          formData.append(`products[${index}].image`, product.productImage);
          formData.append(`products[${index}].price`, product.price);
          formData.append(`products[${index}].quantity`, product.quantity);
          formData.append(`products[${index}].description`, product.description);
          formData.append(`products[${index}].ingredients`, product.ingredients);
          formData.append(`products[${index}].nutritionalInfo`, product.nutritionalInfo);
          formData.append(`products[${index}].frontImage`, product.frontImage);
          formData.append(`products[${index}].backImage`, product.backImage);
          formData.append(`products[${index}].leftImage`, product.leftImage);
          formData.append(`products[${index}].rightImage`, product.rightImage);
          formData.append(`products[${index}].category`, product.category);
        });
      } else {
        const product = products[0];
        formData.append('name', product.productName);
        formData.append('image', product.productImage);
        formData.append('price', product.price);
        formData.append('quantity', product.quantity);
        formData.append('description', product.description);
        formData.append('ingredients', product.ingredients);
        formData.append('nutritionalInfo', product.nutritionalInfo);
        formData.append('frontImage', product.frontImage);
        formData.append('backImage', product.backImage);
        formData.append('leftImage', product.leftImage);
        formData.append('rightImage', product.rightImage);
        formData.append('category', product.category);
      }

      const response = await fetch('http://localhost:8000/api/add-products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setSnackbarMessage('Products added successfully!');
      setSnackbarSeverity('success');
    } catch (error) {
      setSnackbarMessage('Error adding products.');
      setSnackbarSeverity('error');
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleBackToDashboard = () => {
    navigate('/admin/dashboard');
  };

  return (
    <Grid container justifyContent="center" className="add-product-container">
      <Grid item xs={12} sm={10} md={8}>
        <Card className="add-product-card">
          <CardContent>
            <div className="card-header">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </Button>
              <div className="title">Add Product(s)</div>
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={isMultiple}
                  onChange={handleSwitchChange}
                  color="primary"
                />
              }
              label="Add Multiple Products"
            />
            <form onSubmit={handleAddProduct} className="add-product-form">
              {isMultiple ? (
                <>
                  {products.map((product, index) => (
                    <div key={index} className="product-entry">
                      <div className="product-header">
                        <Typography variant="h6">Product {index + 1}</Typography>
                        {index > 0 && (
                          <IconButton
                            className="remove-product"
                            onClick={() => setProducts(products.filter((_, i) => i !== index))}
                          >
                            <CloseIcon />
                          </IconButton>
                        )}
                      </div>
                      <TextField
                        label="Product Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.productName}
                        onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                        required
                      />
                      <input
                        accept="image/*"
                        id={`product-image-upload-${index}`}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleProductImageChange(index, 'productImage', e)}
                      />
                      <label htmlFor={`product-image-upload-${index}`}>
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<PhotoCamera />}
                        >
                          Upload Cover Image
                        </Button>
                      </label>
                      {product.productImage && (
                        <img
                          src={URL.createObjectURL(product.productImage)}
                          alt="Cover"
                          className="image-preview"
                        />
                      )}
                      <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.price}
                        onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        required
                      />
                      <TextField
                        label="Quantity"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                        required
                      />
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                          value={product.category}
                          onChange={(e) => handleProductChange(index, 'category', e.target.value)}
                          label="Category"
                          required
                        >
                          <MenuItem value="Electronics">Electronics</MenuItem>
                          <MenuItem value="Clothing">Clothing</MenuItem>
                          <MenuItem value="Accessories">Accessories</MenuItem>
                          <MenuItem value="Home">Home</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={product.description}
                        onChange={(e) => handleProductChange(index, 'description', e.target.value)}
                        required
                      />
                      <TextField
                        label="Ingredients"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.ingredients}
                        onChange={(e) => handleProductChange(index, 'ingredients', e.target.value)}
                        required
                      />
                      <TextField
                        label="Nutritional Information"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={product.nutritionalInfo}
                        onChange={(e) => handleProductChange(index, 'nutritionalInfo', e.target.value)}
                        required
                      />
                      <input
                        accept="image/*"
                        id={`product-front-image-upload-${index}`}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleProductImageChange(index, 'frontImage', e)}
                      />
                      <label htmlFor={`product-front-image-upload-${index}`}>
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<PhotoCamera />}
                        >
                          Upload Front Image
                        </Button>
                      </label>
                      {product.frontImage && (
                        <img
                          src={URL.createObjectURL(product.frontImage)}
                          alt="Front"
                          className="image-preview"
                        />
                      )}
                      <input
                        accept="image/*"
                        id={`product-back-image-upload-${index}`}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleProductImageChange(index, 'backImage', e)}
                      />
                      <label htmlFor={`product-back-image-upload-${index}`}>
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<PhotoCamera />}
                        >
                          Upload Back Image
                        </Button>
                      </label>
                      {product.backImage && (
                        <img
                          src={URL.createObjectURL(product.backImage)}
                          alt="Back"
                          className="image-preview"
                        />
                      )}
                      <input
                        accept="image/*"
                        id={`product-left-image-upload-${index}`}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleProductImageChange(index, 'leftImage', e)}
                      />
                      <label htmlFor={`product-left-image-upload-${index}`}>
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<PhotoCamera />}
                        >
                          Upload Left Image
                        </Button>
                      </label>
                      {product.leftImage && (
                        <img
                          src={URL.createObjectURL(product.leftImage)}
                          alt="Left"
                          className="image-preview"
                        />
                      )}
                      <input
                        accept="image/*"
                        id={`product-right-image-upload-${index}`}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleProductImageChange(index, 'rightImage', e)}
                      />
                      <label htmlFor={`product-right-image-upload-${index}`}>
                        <Button
                          variant="outlined"
                          component="span"
                          startIcon={<PhotoCamera />}
                        >
                          Upload Right Image
                        </Button>
                      </label>
                      {product.rightImage && (
                        <img
                          src={URL.createObjectURL(product.rightImage)}
                          alt="Right"
                          className="image-preview"
                        />
                      )}
                      {index === products.length - 1 && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => setProducts([...products, {
                            productName: '',
                            productImage: null,
                            price: '',
                            quantity: '',
                            description: '',
                            ingredients: '',
                            nutritionalInfo: '',
                            frontImage: null,
                            backImage: null,
                            leftImage: null,
                            rightImage: null,
                            category: ''
                          }])}
                        >
                          Add Another Product
                        </Button>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div className="product-entry">
                  <TextField
                    label="Product Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={products[0].productName}
                    onChange={(e) => handleProductChange(0, 'productName', e.target.value)}
                    required
                  />
                  <input
                    accept="image/*"
                    id="product-image-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => handleProductImageChange(0, 'productImage', e)}
                  />
                  <label htmlFor="product-image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<PhotoCamera />}
                    >
                      Upload Cover Image
                    </Button>
                  </label>
                  {products[0].productImage && (
                    <img
                      src={URL.createObjectURL(products[0].productImage)}
                      alt="Cover"
                      className="image-preview"
                    />
                  )}
                  <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={products[0].price}
                    onChange={(e) => handleProductChange(0, 'price', e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    required
                  />
                  <TextField
                    label="Quantity"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={products[0].quantity}
                    onChange={(e) => handleProductChange(0, 'quantity', e.target.value)}
                    required
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={products[0].category}
                      onChange={(e) => handleProductChange(0, 'category', e.target.value)}
                      label="Category"
                      required
                    >
                      <MenuItem value="Electronics">Electronics</MenuItem>
                      <MenuItem value="Clothing">Clothing</MenuItem>
                      <MenuItem value="Accessories">Accessories</MenuItem>
                      <MenuItem value="Home">Home</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={products[0].description}
                    onChange={(e) => handleProductChange(0, 'description', e.target.value)}
                    required
                  />
                  <TextField
                    label="Ingredients"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={products[0].ingredients}
                    onChange={(e) => handleProductChange(0, 'ingredients', e.target.value)}
                    required
                  />
                  <TextField
                    label="Nutritional Information"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={products[0].nutritionalInfo}
                    onChange={(e) => handleProductChange(0, 'nutritionalInfo', e.target.value)}
                    required
                  />
                  <input
                    accept="image/*"
                    id="product-front-image-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => handleProductImageChange(0, 'frontImage', e)}
                  />
                  <label htmlFor="product-front-image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<PhotoCamera />}
                    >
                      Upload Front Image
                    </Button>
                  </label>
                  {products[0].frontImage && (
                    <img
                      src={URL.createObjectURL(products[0].frontImage)}
                      alt="Front"
                      className="image-preview"
                    />
                  )}
                  <input
                    accept="image/*"
                    id="product-back-image-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => handleProductImageChange(0, 'backImage', e)}
                  />
                  <label htmlFor="product-back-image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<PhotoCamera />}
                    >
                      Upload Back Image
                    </Button>
                  </label>
                  {products[0].backImage && (
                    <img
                      src={URL.createObjectURL(products[0].backImage)}
                      alt="Back"
                      className="image-preview"
                    />
                  )}
                  <input
                    accept="image/*"
                    id="product-left-image-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => handleProductImageChange(0, 'leftImage', e)}
                  />
                  <label htmlFor="product-left-image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<PhotoCamera />}
                    >
                      Upload Left Image
                    </Button>
                  </label>
                  {products[0].leftImage && (
                    <img
                      src={URL.createObjectURL(products[0].leftImage)}
                      alt="Left"
                      className="image-preview"
                    />
                  )}
                  <input
                    accept="image/*"
                    id="product-right-image-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => handleProductImageChange(0, 'rightImage', e)}
                  />
                  <label htmlFor="product-right-image-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<PhotoCamera />}
                    >
                      Upload Right Image
                    </Button>
                  </label>
                  {products[0].rightImage && (
                    <img
                      src={URL.createObjectURL(products[0].rightImage)}
                      alt="Right"
                      className="image-preview"
                    />
                  )}
                </div>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                startIcon={loading && <CircularProgress size={24} />}
                className='add-product-button'
              >
                {loading ? 'Adding...' : 'Add Product(s)'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AddProduct;
