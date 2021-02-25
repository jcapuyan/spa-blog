import React from 'react';
import moment from 'moment';

import CommentItem from '../components/CommentItem';
import AddComment from '../components/AddComment';

import '../css/Comment.scss';

const Comment = ({ comments, post }) => {


  if ( !comments ) {
    return (
      <section className="comment">
        <div className="l-container">
          <h2 className="comment-heading">COMMENT</h2>
          <div className="comment-list">
            <p>No comments.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="comment">
      <div className="l-container">
        <h2 className="comment-heading">COMMENT</h2>
        <div className="comment-list">
          {
            comments.map((item, i) => {
              return (
                <CommentItem key={i} content={item.content} date={`${moment(item.createdAt).fromNow()}`} />
              )
            })
          }
        </div>
        <AddComment post={post} />
      </div>
    </section>
  )
}

export default Comment;
