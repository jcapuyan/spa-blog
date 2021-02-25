import React from 'react';
import '../css/CommentItem.scss';

const CommentItem = ({ content, date }) => {
  return (
    <div className="comment-item">
      <div className="comment-item-content"><p>{content}</p></div>
      <div className="comment-item-date">{date}</div>
    </div>
  )
}

export default CommentItem;
