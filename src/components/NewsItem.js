import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import noimage from '../images/noimage.jpg';
import '../css/NewsItem.scss';

const NewsItem = ({ item }) => {
  return (
    <article className="news-item-article">
      <Link className="news-item-link" to={'/' + item.id}>
        <div className="news-item-inner">
          <div className="news-item-thumbnail">
            <div className="news-item-image" style={{backgroundImage: `url(${(item.image != null && item.image !== "") ? item.image : noimage})`}}></div>
          </div>
          <time className="news-item-date" dateTime={moment(item.createdAt).format('YYYY-MM-DD')}>{moment(item.createdAt).format('YYYY.MM.DD')}</time>
          <p className="news-item-content">{item.title}</p>
        </div>
      </Link>
    </article>
  );
}

export default NewsItem;
