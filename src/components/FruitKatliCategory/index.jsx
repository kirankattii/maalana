import React from "react";

import ProductList from "../common/ProductList/index.jsx";

import Cat1 from '../../assets/fruit-katli/f-1.svg';
import Cat2 from'../../assets/fruit-katli/f-2.svg';
import Cat3 from '../../assets/fruit-katli/f-3.svg';
import Cat4 from '../../assets/fruit-katli/f-4.svg';
import Cat5 from '../../assets/fruit-katli/f-5.svg';

const products = [
    { id: 1, img: Cat1, name: 'Strawberry Fruit Katli - 250 g', price: 150 },
    { id: 2, img: Cat2, name: 'Pineapple Fruit Katli - 250 g', price: 150 },
    { id: 3, img: Cat3, name: 'Orange Fruit Katli - 250 g', price: 150 },
    { id: 4, img: Cat4, name: 'Mango Fruit Katli - 250 g', price: 150 },
    { id: 5, img: Cat5, name: 'Guava Fruit Katli - 250 g', price: 150 }
];

const FruitKatliCategory = () => {
    return (
        <>
           <ProductList products={products} />
        </>
    );
};

export default FruitKatliCategory;