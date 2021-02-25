import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';

import noimage from '../images/noimage.jpg';
import image from '../images/banner1.jpg';
import arrow from '../images/arrow.svg';

import '../css/Hero.scss';

const Hero = () => {
  const [ posts, setPosts ] = useState([]);

  const GET_POST = gql`
    query posts($offset: Int, $limit: Int) {
      posts(pagination : {offset: $offset, limit: $limit}) {
        id
        title
        content
        image
        createdAt
      }
    }
    `;
    const { data } = useQuery(
      GET_POST,
      {
        variables: {
          offset: 0,
          limit: 3
        },
        fetchPolicy: "cache-and-network"
      }
    );
    useEffect(() => {
      if (data) {
        setPosts(data.posts);
      }
    }, [data])

  // const posts = useSelector(store => store.posts.posts);
  const limitPosts = posts.slice(0, 3);

  const max = 3;
  const [active, setActive] = useState(0);

  const nextSlide = () => active < max - 1 && setActive(active + 1);
  const prevSlide = () => active > 0 && setActive(active - 1);
  const isActive = (value) => active === value && 'is-active';

  const setSliderStyle = () => {
    const transition = active * -100;

    return {
      width: (max * 100) + 'vw',
      transform: 'translateX(' + transition + 'vw)'
    }
  }

  return (
    <div className="hero">
      <ul className="hero-list" style={setSliderStyle()}>
        {
          posts.map((hero, i) => (
            <li className="hero-item" key={i} style={{backgroundImage: `url(${(hero.image != null && hero.image !== "") ? hero.image : noimage})`}}>
              <Link to={`/${hero.id}`}>
                <div className="hero-item-wrapper">
                  <div className="hero-item-text">
                    <div className="hero-item-title">
                      <h2 dangerouslySetInnerHTML={{ __html: hero.title }} />
                    </div>
                    <time className="hero-item-date" dateTime={moment(hero.createdAt).format('YYYY-MM-DD')}>{moment(hero.createdAt).format('YYYY.MM.DD')}</time>
                  </div>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
      <ul className="hero-dots">
        {
          limitPosts.map((hero, i) => (
            <li className={'hero-dots-item ' + isActive(i)} key={i}>
              <button className="hero-dots-button" onClick={() => setActive(i)}></button>
            </li>
          ))
        }
      </ul>

      <button className='hero-arrow hero-arrow-prev' onClick={prevSlide}>
        <img src={arrow} alt=""></img>
      </button>

      <button className='hero-arrow hero-arrow-next' onClick={nextSlide}>
        <img src={arrow} alt=""></img>
      </button>
    </div>
  );
}

export default Hero;
