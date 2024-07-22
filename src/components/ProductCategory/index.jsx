
import React from 'react';
import './ProductCategory.scss';

import Cat1 from '../../assets/product-category/img-1.svg';
import Cat2 from '../../assets/product-category/img-2.svg';
import Cat3 from '../../assets/product-category/img-3.svg';
import Cat4 from '../../assets/product-category/img-4.svg';
import Cat5 from '../../assets/product-category/img-5.svg';
import Cat6 from '../../assets/product-category/img-6.svg';

const products = [
  { img: Cat1, name: 'Imli Ladoo' },
  { img: Cat2, name: 'Family Candy Pack' },
  { img: Cat3, name: 'Lollipop' },
  { img: Cat4, name: 'Candy' },
  { img: Cat5, name: 'Aam Papad' },
  { img: Cat6, name: 'Fruit Katli' }
];

const ProductCategory = ({ handleClick, selectedProduct }) => {


  return (
    <div className="product-category">
      {products.map((product, index) => (
        <div
          key={index}
          className={`product-item ${selectedProduct === index ? 'selected' : ''}`}
          onClick={() => handleClick(index)}
        >
          <div className="product-circle">
            <img className="product-image" src={product.img} alt={product.name} />
          </div>
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductCategory;
