import React from 'react';

const Article = (props) => {
  return (
    <article>
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
    </article>
  );
}

export default Article;
