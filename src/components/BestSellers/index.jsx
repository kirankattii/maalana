import React from 'react';


import './BestSellers.scss';

import Best1 from '../../assets/best-sellers/img-1.svg';
import Best3 from '../../assets/best-sellers/img-2.svg';
import Best2 from '../../assets/best-sellers/img-3.svg';
import Best4 from '../../assets/best-sellers/img-4.svg';


import CommonProductCard from '../common/CommonProductCard';

const products = [
    {
        id: 1,
        name: 'Orange Fruit Katli - 250 g',
        price: '₹150',
        image: Best1,
        backgroundColor: '#E0F2FF',
    },
    {
        id: 2,
        name: 'Strawberry Fruit Katli - 250 g',
        price: '₹150',
        image: Best2,
        backgroundColor: '#E2FFB2',
    },
    {
        id: 3,
        name: 'Orange Fruit Katli - 250 g',
        price: '₹150',
        image: Best3,
        backgroundColor: '#FFE4BE',
    },
    {
        id: 4,
        name: 'Lollipop Fruit Flavour - 250 g',
        price: '₹150',
        image: Best4,
        backgroundColor: '#FFBEBE',
    },
];

const BestSellers = () => {
    const handleAddToCart = (product) => {
        console.log(`Added ${product.name} to cart.`);
    }
    return (
        <>
            <CommonProductCard
                title={'Best Sellers'}
                products={products}
                handleAddToCart={handleAddToCart}
            />
        </>
    );
};

export default BestSellers;
