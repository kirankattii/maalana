import React from "react";

import Cat1 from '../../assets/products/img-1.svg';
import Cat2 from '../../assets/products/img-2.svg';
import Cat3 from '../../assets/products/img-3.svg';

import ProductList from "../common/ProductList";

const products = [
    { id: 1, img: Cat1, name: 'Assorted Fruit Lollipop-150 g', price: 150 },
    { id: 2, img: Cat2, name: 'Assorted Fruit Pop-150 g', price: 150 },
    { id: 3, img: Cat3, name: 'Assorted Fruit Lollipop-150 g', price: 150 }
  ];
const LollipopCategory = () => {
    return (
        <>
           <ProductList products={products} />
        </>
    );
};

export default LollipopCategory