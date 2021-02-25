import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import moment from 'moment';

import CommentItem from '../components/CommentItem';
import Breadcrumbs from '../components/Breadcrumbs';

import noimage from '../images/noimage.jpg';
import '../css/Detail.scss';
import '../css/Comment.scss';

const SinglePage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState();
  const [comment, setComment] = useState('');

  const { data } = useQuery(GET_POST, {
    variables: {
      id: parseInt(id)
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    refetchQueries: [{
      query: GET_POST,
      variables: { id: parseInt(id) }
    }]
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment({
      variables: {
        postId: data.post.id,
        content: comment
      }
    });
    setComment('');
  }

  useEffect(() => {
    if (data) {
      setPost(data.post);
    }
  }, [data])

  if ( !post ) {
    return <p>Loading...</p>
  }

  return (
    <div className="subpage">
      <Breadcrumbs title={post.title} />

      <section className="detail">
        <div className="l-container">
          {user && (
            <div className="detail-edit detail-edit-single">
              <Link className="detail-edit-link" to={`/${post.id}/edit`}>Edit Post</Link>
            </div>
          )}
          <time className="detail-date" dateTime={moment(post.createdAt).format('YYYY-MM-DD')}>{moment(post.createdAt).format('YYYY.MM.DD')}</time>
          <h1 className="detail-title">{post.title}</h1>
          <div className="detail-image" style={{backgroundImage: `url(${(post.image != null && post.image !== "") ? post.image : noimage})`}}></div>
          <div className="detail-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </section>
      <section className="comment">
        <div className="l-container">
          <h2 className="comment-heading">COMMENT</h2>
          <div className="comment-list">
            {
              data.post.comments.map((item, i) => {
                return (
                  <CommentItem key={i} content={item.content} date={`${moment(item.createdAt).fromNow()}`} />
                )
              })
            }
          </div>
          <div className="comment-form">
            <label htmlFor="comment" />
            <textarea className="comment-field" id="comment" placeholder="Write Comment" onChange={e => setComment(e.target.value)} value={comment} />
            <button className="comment-button" disabled={comment.trim() === ''} onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </section>

    </div>
  )
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation addComment($postId: Int!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      id
      postId
      content
      createdAt
    }
  }
`;

const GET_POST = gql`
  query getPost($id: Int!) {
    post(id: $id) {
      id
      title
      content
      image
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
  `;

export default SinglePage;
