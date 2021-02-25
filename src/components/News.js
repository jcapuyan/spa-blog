import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import NewsItem from '../components/NewsItem';

import '../css/News.scss';

const News = ({ posts, handleLoadMore }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="news">
      <div className="l-container">
        <div className="news-heading">
          <h2 className="news-title">NEWS</h2>
          { user && (
            <Link to="/create-new-post" className="news-create">Create New Post</Link>
          )}
        </div>
        <ul className="news-list">
          {
            posts.map((post, i) => {
              return (
                <li className="news-item" key={post.id}>
                  <NewsItem item={post} id={post.id} title={post.title} image={post.image} date={post.date} />
                </li>
              )
            })
          }
        </ul>
        <div className="news-load-more">
          <button className="news-load-more-btn" onClick={handleLoadMore}>LOAD MORE</button>
        </div>
      </div>
    </div>
  );
}

export default News;
