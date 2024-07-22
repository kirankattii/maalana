import React from "react";

import './FruitKatliBanner.scss';

const view = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116806/view_esswgu.svg';
const fruit = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116807/fruit_iqcb7l.svg';
const cloud = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116819/cloud_tc8bxi.svg';


const FruitKatliBanner = () => {
    return (
        <>
            <div className="fruit-katli-banner">
                <div className="image-container">
                    <img
                        src={view}
                        alt="view"
                        className="view-image"
                        data-aos="zoom-in-down"
                    />
                    <img
                        src={fruit}
                        alt="fruit"
                        className="fruit-image"
                        data-aos="zoom-in-up"
                    />
                    <img
                        src={cloud}
                        alt="cloud"
                        className="cloud-image"
                        data-aos="zoom-in-left"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="1000"
                    />
                </div>
            </div>
        </>
    )
};
export default FruitKatliBanner;