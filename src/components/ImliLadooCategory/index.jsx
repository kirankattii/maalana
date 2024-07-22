import React from "react";

import ProductList from "../common/ProductList/index.jsx";

import Cat1 from '../../assets/imli/I-1.svg';
import Cat2 from '../../assets/imli/I-2.svg';
import Cat3 from '../../assets/imli/I-3.svg';
import Cat4 from '../../assets/imli/I-4.svg';
import Cat5 from '../../assets/imli/I-5.svg';

const products = [
    { id:'66910e73740e745cef3b98d2', img: Cat1, name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id:'66910f73740e745cef3b98d4', img: Cat2, name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id:'66910f74740e745cef3b98d6', img: Cat3, name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id:'66910f75740e745cef3b98d8', img: Cat4, name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id:'66910f75740e745cef3b98da', img: Cat5, name: 'Imli soft candy pouch - 100 g', price: 50 }
  ];
const ImliLadooCategory = () => {
    return (
      <>
      <ProductList products={products} />
      </>  
    );
};
export default ImliLadooCategory;