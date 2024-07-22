import React, { useEffect, useState } from 'react';
import './BannerBlurScroll.scss';

 
const Imag1 = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116821/img-2_tllnix.svg';
const Imag2  = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116812/img-3_y49mdm.svg';
const Imag3  = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116814/img-4_cyhz1e.svg';
const Imag4  = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116825/img-5_nmiu7u.svg';

//bg 
const Bg  = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116808/img-1_rvm7um.svg';
const Bg2 = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116819/img-7_lbhwgo.svg';

const BannerBlurScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [bgImage, setBgImage] = useState(Bg);

  const handleScroll = () => {
    setScrollY(window.scrollY);
    if (window.scrollY > 0) {
      setBgImage(Bg2);
    } else {
      setBgImage(Bg);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const getTransformValue = (initial, direction) => {
    const factor = 0.4; // 40% scroll pass-through
    const translate = scrollY * factor * direction;
    return `translate(${translate}px, ${translate}px)`;
  };

  return (
    <div 
    className={`container ${scrollY > 0 ? 'scrolled' : ''}`}
    style={{ backgroundImage: `url(${bgImage})`, backgroundColor: '#B9D514' }}
    >
      <img
        className="item item1"
        src={Imag1}
        alt="Item 1"
        style={{ transform: getTransformValue(-40, 1) }}
      />
      <img
        className="item item2"
        src={Imag2}
        alt="Item 2"
        style={{ transform: getTransformValue(-40, -1) }}
      />
      <img
        className="item item3"
        src={Imag3}
        alt="Item 3"
        style={{ transform: getTransformValue(40, 1) }}
      />
      <img
        className="item item4"
        src={Imag4}
        alt="Item 4"
        style={{ transform: getTransformValue(40, -1) }}
      />
    </div>
  );
};

export default BannerBlurScroll;
