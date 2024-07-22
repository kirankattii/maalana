import React from "react";

import ProductList from "../common/ProductList/index.jsx";

import Cat1 from '../../assets/candies/c-1.svg';
import Cat2 from '../../assets/candies/c-2.svg';
import Cat3 from '../../assets/candies/c-3.svg';
import Cat4 from '../../assets/candies/c-4.svg';

const products = [
    { id: 1, img: Cat1, name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: 2, img: Cat2, name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: 3, img: Cat3, name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: 4, img: Cat4, name: 'Imli soft candy pouch - 100 g', price: 50 }
];

const Candies = () => {
    return (
        <>
            <ProductList products={products} />
        </>
    );
};

export default Candies;