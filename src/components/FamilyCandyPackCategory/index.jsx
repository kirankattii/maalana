import React from "react";

import Cat1 from '../../assets/FamilyCandyPack/f-1.svg';
import Cat2 from '../../assets/FamilyCandyPack/f-2.svg';
import Cat3 from '../../assets/FamilyCandyPack/f-3.svg';
import Cat4 from '../../assets/FamilyCandyPack/f-4.svg';
import Cat5 from '../../assets/FamilyCandyPack/f-5.svg';
import Cat6 from '../../assets/FamilyCandyPack/f-6.svg';

import ProductList from "../common/ProductList/index.jsx";

const products = [
    { id: 1, img: Cat1, name: 'Mango Candies - 250 g', price: 130 },
    { id: 2, img: Cat2, name: 'Imli Ladoo - 250 g', price: 130 },
    { id: 3, img: Cat3, name: 'Masala Candies - 250 g', price: 130 },
    { id: 4, img: Cat4, name: 'Mix Fruit Candies - 250 g', price: 130 },
    { id: 5, img: Cat5, name: 'Pan Candies - 250 g', price: 130 },
    { id: 6, img: Cat6, name: 'Orange Candies - 250 g', price: 130 }
];

const FamilyCandyPackCategory = () => {
    return (
        <>
           <ProductList products={products} />
        </>
    );
};

export default FamilyCandyPackCategory