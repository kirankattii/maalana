import React, { useEffect, useRef, useState } from "react";
import "./ImliCategoryBanner.scss";

const TopLeftImli = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116825/img-3_r9w8nm.svg';
const view = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116841/view_n7sxzd.svg';
const cloud = 'https://res.cloudinary.com/dtivafy25/image/upload/v1721116845/cloud_zv7kiw.svg';

const ImliCategoryBanner = () => {
  const imliRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    const handleImageLoad = () => {
      setIsLoading(false);
      // Set delay for displaying the view more button
      setTimeout(() => {
        setIsDelayed(true);
      }, 2000); // 2000 ms delay, adjust as needed
    };

    const imgElement = imliRef.current;

    if (imgElement) {
      imgElement.addEventListener('load', handleImageLoad);
      imgElement.src = TopLeftImli;

      return () => {
        imgElement.removeEventListener('load', handleImageLoad);
      };
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('zoom-in');
          } else {
            entry.target.classList.remove('zoom-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imliRef.current) {
      observer.observe(imliRef.current);
    }

    return () => {
      if (imliRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(imliRef.current);
      }
    };
  }, []);

  return (
    <div className="imli-category-banner">
      <div className={`image-container ${isLoading ? 'loading' : 'loaded'}`}>
        <img
          src={TopLeftImli}
          alt="TopLeftImli"
          className="top-left-imli"
          ref={imliRef}
        />
        <img
          src={view}
          alt={'view'}
          className={`view-more-btn ${isDelayed ? 'delayed' : ''}`}
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1500"
        />
        <img
          src={cloud}
          alt="cloud"
          className="cloud-img"
          data-aos="zoom-out-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
        />
      </div>
    </div>
  );
}

export default ImliCategoryBanner;
