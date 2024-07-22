import React from 'react';
import './EveryBite.scss';

const EveryBite = () => {
  return (
    <div className="logo-container">
      <div className="progress-circle">
        <div className="progress-inner-circle"></div>
      </div>
      <div className="text">
        <span className="happiness">Happiness</span>
        <span className="tagline">in Every Bite.</span>
      </div>
    </div>
  );
};

export default EveryBite;
