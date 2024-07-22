import React from "react";

import './LollipopBanner.scss';

const cloud = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116847/cloud_glizgk.svg';
const lollipop = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116846/lollipop_bbghvx.svg';
const viewbtn = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116846/veiw_dti6cw.svg';

const LollipopBanner = () => {
    return (
        <>
            <div className="lollipop-cate-container">
                <div className="lollipop-cate-image">
                    <img
                        src={cloud}
                        alt="cloud"
                        className="cloud-cate-img"
                        data-aos="zoom-out-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="1500"
                    />
                    <img
                        src={lollipop}
                        alt="lollipop"
                        className="lollipop-cate-img"
                        data-aos="zoom-out"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="1000"
                    />
                    <img
                        src={viewbtn}
                        alt="viewbtn"
                        className="viewbtn-cate-img"
                         data-aos="zoom-in"
                    />
                </div>
            </div>
        </>
    )
}
export default LollipopBanner;