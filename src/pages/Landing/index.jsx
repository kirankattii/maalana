import React from "react";

import BannerBlurScroll from "../../components/LandingBanner/BannerBlurScroll.jsx";
import ImliBanner from "../../components/LandingBanner/ImliBanner.jsx";
import ImliCategoryBanner from "../../components/LandingBanner/ImliCategoryBanner.jsx";
import LollipopBanner from "../../components/LandingBanner/LollipopBanner/index.jsx";
import FruitKatliBanner from "../../components/LandingBanner/FruitKatliBanner/index.jsx";
import CandiesBanner from '../../components/LandingBanner/CandiesBanner/index.jsx';
import EventsLayout from "../../components/LandingBanner/EventsLayout/index.jsx";
import Testimonial from "../../components/Testimonial/index.jsx";

const Landing = () => {
    return (
        <>
           <BannerBlurScroll />
           <ImliBanner />
           <ImliCategoryBanner />
           <LollipopBanner />
           <FruitKatliBanner />
           <CandiesBanner />
           <EventsLayout />
           <Testimonial />
        </>
    );
};

export default Landing;