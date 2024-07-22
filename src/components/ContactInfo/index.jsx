import React from 'react';
import './ContactInfo.scss';
import Image1 from '../../assets/contact-info/img-1.svg';
import Image2 from '../../assets/contact-info/img-2.svg';

const ContactInfo = () => {
  return (
    <div className="contact-info-container">
      <img src={Image1} alt="decorative" className="contact-info-image-left" />
      <img src={Image2} alt="decorative" className="contact-info-image-right" />
      <div className="contact-info-content">
        
      </div>
    </div>
  );
};

export default ContactInfo;
