import React from 'react';
import { Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import './AnimatedButton.scss';

const AnimatedButton = () => {
    const handleClick = () => {
        // Handle click logic here
        console.log('Button clicked');
    };

    return (
        <Button variant="contained" className="cart-button" onClick={handleClick}>
            <span className="button-text add-to-cart">Add to cart</span>
            <span className="button-text added">Added</span>
            <ShoppingCart className="icon shopping-cart" />
            <div className="box-icon" />
        </Button>
    );
};

export default AnimatedButton;
