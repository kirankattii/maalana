import React from "react";

import './Cadies.scss'

const Cloud = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116808/cloud_tojxnk.svg';
const view = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116801/view_iwzptz.svg';
const candies = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116811/candies_qzwq5b.svg'

const CandiesBanner = () => {
return(
    <>
    <div className="candies-banner">
        <div className="candies-image">
            <img 
             src={Cloud}
             alt="cloud"
             className="cadies-cloud-img"
             data-aos="zoom-out-right"
             data-aos-offset="300"
             data-aos-easing="ease-in-sine"
             data-aos-duration="1500"
            />
            <img 
            src={view}
            alt="view"
            className="candies-view-img"
            data-aos="zoom-in"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            />
            <img
            src={candies}
            alt="candies"
            className="candies-img-product"
            data-aos="zoom-out"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            />
        </div>
    </div>
    </>
)
};
export default CandiesBanner