import React from "react";

import ProductList from "../common/ProductList/index.jsx";

import Cat1 from '../../assets/aam-papad/a-1.svg';
import Cat2 from '../../assets/aam-papad/a-2.svg';
import Cat3 from '../../assets/aam-papad/a-3.svg';

const products = [
    { id: 1, img: Cat1, name: 'Aam Papad - 100 g', price: 50 },
    { id: 2, img: Cat2, name: 'Aam Papad - 100 g', price: 50 },
    { id: 3, img: Cat3, name: 'Aam Papad - 100 g', price: 50 },
];

const AamPapadCategory = () => {
    return (
        <>
           <ProductList products={products} />
        </>
    );
};
export default AamPapadCategory;