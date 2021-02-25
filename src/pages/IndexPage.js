import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_POSTS } from '../utils/graphql';

import Hero from '../components/Hero';
import News from '../components/News';

import '../css/Index.scss';

const IndexPage = () => {
  const [ posts, setPosts ] = useState([]);
  const [ limit, setLimit ] = useState(6);
  const { loading, data } = useQuery(
    GET_POSTS,
    {
      variables: {
        offset: 0,
        limit: limit
      },
      fetchPolicy: "cache-and-network"
    }
  );
  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data])

  const handleLoadMore = () => {
    setLimit(limit + 6);
  }

  return (
    <div className="index">
      <Hero />
      <News posts={posts} handleLoadMore={handleLoadMore} />
    </div>
  );
}

export default IndexPage;
