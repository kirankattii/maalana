import React from "react";

import CommonProductCard from "../common/CommonProductCard/index.jsx";

import L1 from '../../assets/lollipop-range/L1.svg';
import L2 from '../../assets/lollipop-range/L2.svg';
import L3 from '../../assets/lollipop-range/L3.svg';

const products = [
    {
        id: 1,
        name: 'Lollipop Fruit Flavour - 250 g',
        price: '₹150',
        image: L1,
        backgroundColor: '#E0F2FF',
    },
    {
        id: 2,
        name: 'Lollipop Fruit Flavour - 250 g',
        price: '₹150',
        image: L2,
        backgroundColor: '#E2FFB2',
    },
    {
        id: 3,
        name: 'Lollipop Fruit Flavour - 250 g',
        price: '₹150',
        image: L3,
        backgroundColor: '#FFE4BE',
    },
];

const LollipopRange = () => {
    const handleAddToCart = (product) => {
        console.log(`Added ${product.name} to cart.`);
    }
    return (
        <>
        <CommonProductCard
            title={'Lollipop Range'}
            products={products}
            handleAddToCart={handleAddToCart}
        />
        </>
    );
};
export default LollipopRange;