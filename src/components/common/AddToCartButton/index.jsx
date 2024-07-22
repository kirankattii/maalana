import React, { useState } from 'react';
import CartIcon from '@mui/icons-material/ShoppingCart';
import './AddToCartButton.scss';

const AddToCartButton = ({ product, handleAddToCartClick }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = async () => {
    // Call the provided handleAddToCartClick function
    await handleAddToCartClick(product.id, true);

    // Trigger animation
    setIsAdded(true);

    // Reset the animation after it completes
    setTimeout(() => {
      setIsAdded(false);
    }, 500); // Match the timeout with the duration of the animation in SCSS
  };

  return (
    <button
      className={isAdded ? `add-to-cart-btn-with-cart-icon` : `add-to-cart-btn`}
      onClick={handleClick}
      
    >
      {isAdded ? 
        <CartIcon className="cart-icon" /> :
        <span className="add-to-cart-text">ADD TO CART</span>
      }
    </button>
  );
};

export default AddToCartButton;
