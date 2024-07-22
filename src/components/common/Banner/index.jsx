import React from 'react';
import Slider from 'react-slick';

import './Banner.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Banner1 from '../../../assets/banner/home-banner.svg';

const banners = [
  { img: Banner1, title: 'Banner 1' },
  { img: Banner1, title: 'Banner 2' },
  { img: Banner1, title: 'Banner 3' }
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="banner-item">
            <img src={banner.img} alt={banner.title} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Banner;
