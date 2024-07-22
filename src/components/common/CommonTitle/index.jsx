import React from 'react';
import './CommonTitle.scss';

const CommonTitle = ({ title, subtitle }) => {
  return (
    <>
      <div className='title-container'>
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
      </div>
    </>
  );
};

export default CommonTitle;
