import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import moment from 'moment';
import Breadcrumbs from '../components/Breadcrumbs';
import Modal from '../components/Modal';

import noimage from '../images/noimage.jpg';
import '../css/Detail.scss';
import '../css/Create.scss';

const SinglePage = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { data } = useQuery(GET_POST, {
    variables: {
      id: parseInt(id)
    }
  });

  const [editPost] = useMutation(EDIT_POST_MUTATION, {
    refetchQueries: [{
      query: GET_POST,
      variables: { id: parseInt(id) }
    }]
  });

  const handleSave = (e) => {
    e.preventDefault();
    editPost({
      variables: {
        id: parseInt(id),
        title: title,
        content: content,
        image: image
      }
    });
    history.push('/'+id);
  }

  const handleClickCancel = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const handleClickYes = () => {
    setTitle('');
    setImage('');
    setContent('');
    setShowModal(false);
    history.push('/'+id);
  }

  const handleClickNo = () => {
    setShowModal(false);
  }

  const handleImageChange = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onload = () => {
      setImage(reader.result);
    }
  }

  useEffect(() => {
    if (data) {
      setTitle(data.post.title);
      setDate(data.post.createdAt);
      setContent(data.post.content);
      setImage(data.post.image);
      setPost(data.post);
    }
  }, [data])

  if ( !user ) {
    return (
      <div className="subpage">
        <Breadcrumbs title={title} />
        <section className="detail">
          <div className="l-container">
            <p>Unauthorized access. Please login.</p>
          </div>
        </section>
      </div>
    )
  }

  if ( !post ) {
    return <p>Loading...</p>
  }

  return (
    <div className="subpage">
      <Breadcrumbs title={title} />
      <section className="detail">
        <div className="l-container">
            <div className="detail-button detail-button-edit">
              <button className="detail-button-link detail-button-save" onClick={handleSave}>Save Post</button>
              <button className="detail-button-link detail-button-cancel" onClick={handleClickCancel}>Cancel</button>
            </div>
            <time className="detail-date detail-date-edit" dateTime={moment(date).format('YYYY-MM-DD')}>{moment(date).format('YYYY.MM.DD')}</time>
            <textarea
              className="detail-title detail-title-edit"
              label="Title"
              name="title"
              placeholder="Title"
              rows="2"
              onChange={e => setTitle(e.target.value)}
              value={title}
              required />
            <div className="create-file">
              <input
                className="create-file-input"
                label="Image"
                name="image"
                type="file"
                onChange={handleImageChange}
              />
              {image &&  <img className="create-file-image" src={image} alt="Preview" /> }
            </div>
            <textarea
              className="detail-content detail-content-edit"
              label="Content"
              name="content"
              placeholder="Content"
              onChange={e => setContent(e.target.value)}
              value={content}
            />
        </div>
      </section>
      {showModal ?
        <Modal handleClickYes={handleClickYes} handleClickNo={handleClickNo} />
      : null}
    </div>
  )
}

const EDIT_POST_MUTATION = gql`
  mutation updatePost($id: Int, $title: String!, $content: String, $image: String) {
    updatePost(post: {id: $id, title: $title, content: $content, image: $image}) {
      id
      title
      content
      image
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
