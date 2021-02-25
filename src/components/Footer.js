import React from 'react';
import '../css/Footer.scss';

import logoFooter from '../images/logo-white.svg';
import arrow from '../images/arrow.svg';

const scrollTop = () => {
   window.scrollTo({top: 0, behavior: 'smooth'});
};

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="l-container">
          <div className="footer-wrapper">
            <div className="footer-logo"><img src={logoFooter} alt="Blog Logo" /></div>
            <p className="footer-text">サンプルテキストサンプル ルテキストサンプルテキストサ<br />ンプルテキストサンプル ルテキスト</p>
          </div>
          <button className="footer-scroll" onClick={scrollTop}>
            <img className="footer-scroll-arrow" src={arrow}></img> TOP
            </button>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="l-container">
          <div className="footer-copyright">
            <small>Copyright©2007-2019 Blog Inc.</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
