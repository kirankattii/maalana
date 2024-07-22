import React, { useState } from 'react';


import './ProductDetail.scss';

// import D1 from 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg';
// import D2 from 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg';
// import D3 from 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg';
// import D4 from 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg';
// import D5 from 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg';

import IncrementDecrementButton from '../../components/common/IncrementDecrementButton/index.jsx';

const product = {
    name: 'Strawberry Fruit Katli - 250 g',
    // weight: '250 g',
    description: 'Indulge in the perfect blend of tradition and modern taste with our Strawberry Fruit Katli. Combining the luscious flavor of ripe strawberries with classic katli texture, this sweet treat is simply irresistible.',
    price: 130,
    rating: 4.5,
    reviews: 548,
    images: [
        'https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg',
        'https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg',
        'https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg',
        'https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg',
        'https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg',
    ],
    nutrition: {
        energy: '343 kcal',
        fat: '0.04 g',
        protein: '0.15 g',
        carbohydrates: '85.56 g',
        sugar: '68.56 g'
    },
    ingredients: 'Sugar, Liquid Glucose, 25% Strawberry Pulp, Pectin (INS-440), Acidity Regulators (INS-331, INS-330)'
};

const ProductDetail = () => {
    const [mainImage, setMainImage] = useState('https://res.cloudinary.com/dtivafy25/image/upload/v1721116899/a-3_pj5u7m.svg');

    // Function to handle thumbnail click
    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };
    return (
        <div className="product-detail">
            <div className="product-images">
                <div className='product-img-main'>
                    <img src={mainImage} alt={product.name} className="main-image" />
                </div>
                <div className="thumbnail-images">
                    {product.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${product.name} ${index}`}
                            className="thumbnail"
                            onClick={() => handleThumbnailClick(image)}
                        />
                    ))}
                </div>
                <div className="additional-info">
                    <div className="nutrition">
                        <h2>NUTRITIONAL INFORMATION</h2>
                        <p><span className="key">Energy:</span> <span className="line"></span> <span className="value">{product.nutrition.energy}</span></p>
                        <p><span className="key">Total Fat:</span> <span className="line"></span> <span className="value">{product.nutrition.fat}</span></p>
                        <p><span className="key">Protein:</span> <span className="line"></span> <span className="value">{product.nutrition.protein}</span></p>
                        <p><span className="key">Carbohydrates:</span> <span className="line"></span> <span className="value">{product.nutrition.carbohydrates}</span></p>
                        <p><span className="key">Sugar:</span> <span className="line"></span> <span className="value">{product.nutrition.sugar}</span></p>
                    </div>
                </div>
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="weight">{product.weight}</p>
                <p className="description">{product.description}</p>
                <div className="rating">
                    {[...Array(5)].map((_, index) => (
                        index < Math.round(product.rating) ? <span key={index} className="star filled">★</span> : <span key={index} className="star">★</span>
                    ))}
                    <p>({product.reviews} Reviews)</p>
                </div>
                <p className="price">₹{product.price}<span>(inclusive of all taxes)</span></p>
                <IncrementDecrementButton />
                <button className="add-to-cart">ADD TO CART</button>
                <button className="buy-now">BUY NOW</button>
                <div className="ingredients">
                    <h2>INGREDIENTS</h2>
                    <p className="ingredients-p">{product.ingredients}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
