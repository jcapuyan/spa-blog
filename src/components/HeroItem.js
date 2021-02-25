import React from 'react';

import Banner from '../images/banner1.jpg';
import '../css/HeroItem.scss';

const HeroItem = ({ title, image, date }) => {
  return (
    <div className="hero-item" style={{backgroundImage: `url(${Banner})`}}>
      <div className="hero-item-wrapper">
        <div className="hero-item-text">
          <div className="hero-item-title">
            <h2 dangerouslySetInnerHTML={{ __html: title }} />
          </div>
          <time className="hero-item-date" dateTime={date}>{date}</time>
        </div>
      </div>
    </div>
  );
}

export default HeroItem;
