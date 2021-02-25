import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Breadcrumbs.scss';

const Breadcrumbs = ({ title }) => {
  return (
    <div className="breadcrumbs">
      <div className="l-container">
        <ul className="breadcrumbs-list">
          <li className="breadcrumbs-item">
            <Link className="breadcrumbs-item-link" to={'/'} >HOME</Link>
          </li>
          <li className="breadcrumbs-item">
            <span className="breadcrumbs-item-link">{title}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
