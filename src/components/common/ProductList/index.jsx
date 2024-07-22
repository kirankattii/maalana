import React, { useState } from 'react';

import Drawer from '@mui/material/Drawer';

import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';

import ProductCard from '../ProductCard/index.jsx';

import './ProductList.scss';

import Cat1 from '../../../assets/product-category/img-1.svg';
import Cat2 from '../../../assets/product-category/img-2.svg';
import Cat3 from '../../../assets/product-category/img-3.svg';
import Cat4 from '../../../assets/product-category/img-4.svg';
import Cat5 from '../../../assets/product-category/img-5.svg';
import Cat6 from '../../../assets/product-category/img-6.svg';
import Cat7 from '../../../assets/product-category/img-7.svg';

import RangeSlider from '../RangeSlider/index.jsx';


const productsCategory = [
  {
    img: Cat1,
    name: 'Imli Ladoo'
  },
  {
    img: Cat2,
    name: 'Family Candy Pack'
  },
  {
    img: Cat3,
    name: 'Lollipop'
  },
  {
    img: Cat4,
    name: 'Candy'
  },
  {
    img: Cat5,
    name: 'Aam Papad'
  },
  {
    img: Cat6,
    name: 'Fruit Katli'
  },
  {
    img: Cat7,
    name: 'View All',
  }
];


const ProductList = ({ products }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(productsCategory.length - 1);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };
  const handleClick = (index) => {
    setSelectedProduct(index);
  }

  console.log("selectedProduct", selectedProduct);

  return (
    <div className="product-list">
      <div className="filter-bar">
        <span className="filter-icon" onClick={toggleDrawer(true)}><TuneIcon /></span>
        <span className="product-count">{products.length} Products</span>
      </div>
      <div className="products-container">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className="filter-drawer-container">
          <div className='filter-drawer'>
            <span className="filter-icon-drawer" onClick={toggleDrawer(true)}><TuneIcon /></span>
            <span className="close-icon" onClick={toggleDrawer(false)}><CloseIcon /></span>
          </div>
          <div className="categories">Categories</div>
          <div className="products-category">
            {productsCategory.map((product, index) => (
              <div key={index} className={`product-item  ${selectedProduct === index ? 'selected' : ''}`}
                onClick={() => handleClick(index)}
              >
                {product.name !== 'View All' ? (
                  <>
                    <div className={`product-image-wrapper`}>
                      <img className="product-image" src={product.img} alt={product.name} />
                    </div>
                    <div className="product-name">{product.name}</div>
                  </>
                )
                  :
                  (
                    <div className={`product-image-wrapper`}>
                      <p style={{ cursor: 'pointer', padding: '12px' }}>{product.name}</p>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
          <div className="price-range">PRICE RANGE</div>
          <RangeSlider />
          <div className='view-result'>
            <button className='view-result-btn'>View Result</button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ProductList;
