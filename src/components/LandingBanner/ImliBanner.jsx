import React, { useEffect, useState, useRef } from 'react';
import './ImliBanner.scss';

const Imag1 = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116825/img-3_r9w8nm.svg';
const Imag2 = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116831/img-4_tkkhhy.svg';
const Imag3 = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116828/img-5_mw75dx.svg';
const Imag4 = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116834/img-6_cbzdup.svg';

//bg
const Bg = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116820/img-1_ukeqji.svg';
const Bg2 = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116822/img-2_uxigpx.svg';

const ImliBanner = () => {
  const [scrollY, setScrollY] = useState(0);
  const [bgImage, setBgImage] = useState(Bg);
  const [isInView, setIsInView] = useState(false);
  const imliRef = useRef(null);

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.4, // Trigger when 40% of the element is in view
      }
    );

    if (imliRef.current) {
      observer.observe(imliRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (imliRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(imliRef.current);
      }
    };
  }, []);

  const getTransformValue = (initial, direction) => {
    const factor = 0.4;
    const translate = scrollY * factor * direction;
    return `translate(${translate}px, ${translate}px)`;
  };

  return (
    <div
      ref={imliRef}
      className={`container ${isInView ? 'scrolled' : ''} ${isInView ? 'zoom' : ''}`}
      style={{ backgroundImage: `url(${bgImage})`, backgroundColor: '#D4C1FF' }}
    >
      <img
        className={`item item1 ${isInView ? 'zoom' : ''}`}
        src={Imag1}
        alt="Item 1"
        style={{ transform: getTransformValue(-40, 1), margin: '104px' }}
      />
      <img
        className={`item item2 ${isInView ? 'zoom' : ''}`}
        src={Imag2}
        alt="Item 2"
        style={{ transform: getTransformValue(-40, -1), margin: '104px' }}
      />
      <img
        className={`item item3 ${isInView ? 'zoom' : ''}`}
        src={Imag3}
        alt="Item 3"
        style={{ transform: getTransformValue(40, 1), margin: '104px' }}
      />
      <img
        className={`item item4 ${isInView ? 'zoom' : ''}`}
        src={Imag4}
        alt="Item 4"
        style={{ transform: getTransformValue(40, -1), margin: '104px' }}
      />
    </div>
  );
};

export default ImliBanner;
