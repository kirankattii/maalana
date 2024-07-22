import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Drawer } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import './ProductCard.scss';
import IncrementDecrementButton from '../IncrementDecrementButton';
import AddToCartButton from '../../../components/common/AddToCartButton/index.jsx';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success' or 'error'
    });

    useEffect(() => {
        const drawerShown = sessionStorage.getItem('drawerShown');
        if (!drawerShown) {
            sessionStorage.setItem('drawerShown', 'false');
        }

    }, []);

    const toggleDrawer = (open) => (event) => {
        console.log("event", open);
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        const drawerShown = sessionStorage.getItem('drawerShown') === 'true';

        if (!drawerShown || !open) {
            setDrawerOpen(open);
            if (open) {
                sessionStorage.setItem('drawerShown', 'true');
            }
        }
    };

    const handleDetailProduct = (id) => {
        navigate(`/product/${id}`);
        console.log(`Product ${id} clicked`);
    }

    const userId = sessionStorage.getItem('userId');
    console.log('userId', userId);

    const handleAddToCartClick = async (id) => {
        setIsAdded(true);
        
        try {
            const res = await fetch(`http://localhost:8000/api/add-to-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: userId,
                    productId: id,
                    quantity: 1,
                    shippingPrice: 50,
                    CoupanCode: "DISCOUNT10",
                }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await res.json();

            if (data.success) {
                setSnackbar({
                    open: true,
                    message: 'Product added to cart successfully!',
                    severity: 'success',
                });
            } else {
                setSnackbar({
                    open: true,
                    message: 'Failed to add product to cart.',
                    severity: 'error',
                });
            }

        } catch (err) {
            console.log(err);
            setSnackbar({
                open: true,
                message: 'Something went wrong. Please try again.',
                severity: 'error',
            });
        } finally {
            setTimeout(() => {
                setIsAdded(false);
            }, 5000);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    
    const drawerShown = sessionStorage.getItem('drawerShown') === 'true';
    return (
        <div className="product-card">
            <img src={product.img} alt={product.name} className="product-image" onClick={() => handleDetailProduct(product.id)} />
            <div className="product-info">
                <p className="product-name">{product.name}</p>
                <div className='product-price-with-btn'>
                    <p className="product-price">₹{product.price}</p>
                    {!drawerShown ? (
                        <button
                            className={`add-to-cart-btn`}
                            onClick={toggleDrawer(true)}
                        >
                            ADD TO CART
                        </button>
                    )
                        :
                        (
                            <AddToCartButton
                                isAdded={isAdded}
                                product={product}
                                toggleDrawer={toggleDrawer}
                                handleAddToCartClick={handleAddToCartClick}
                            />
                        )
                    }
                </div>
            </div>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <div className="add-drawer-container">
                    <div className='add-drawer'>
                        <span className="add-icon-drawer" onClick={toggleDrawer(true)}><ShoppingBagIcon /></span>
                        <span className="close-icon" onClick={toggleDrawer(false)}><CloseIcon /></span>
                    </div>
                    <div className='product-image'>
                        <img src={product.img} alt={product.name} />
                        <p>
                            {product.name}
                            <br />
                            {' '}
                            ₹<span>{product.price}</span>
                            <br />
                            {' '}
                            <IncrementDecrementButton />
                            <p className="remove-btn">remove</p>
                        </p>
                    </div>
                    <div className='go-to-cart'>
                        <button className='go-to-cart-btn'>GO TO CART</button>
                    </div>
                </div>
            </Drawer>
            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity} 
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProductCard;
