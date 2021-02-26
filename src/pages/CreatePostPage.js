import React, { useState, useEffect, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { useForm } from '../utils/hooks';
import { GET_POSTS } from '../utils/graphql';
import { AuthContext } from '../context/auth';

import Breadcrumbs from '../components/Breadcrumbs';
import Modal from '../components/Modal';

import '../css/Create.scss';
import '../css/Detail.scss';
import '../css/Wrapper.scss';

const CreatePostPage = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [preview, setPreview] = useState();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [ createPost, { data } ] = useMutation(CREATE_POST_MUTATION, {
    variables: { title: title, image: image, content: content },
    update(_, result) {
      setTitle('');
      setImage('');
      setContent('');
      history.push('/'+ result.data.addPost.id);
    }
  })

  function createPostCallback() {
    createPost();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
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
    history.push('/');
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

  if (!user) {
    return (
      <>
      <Breadcrumbs title="Create New Post" />
      <div className="wrapper">
        <div className="l-container">
          <p>Unauthorized Access. Please login.</p>
        </div>
      </div>
      </>
    )
  }

  return (
    <>
      <Breadcrumbs title="Create New Post" />
      <div className="wrapper">
        <div className="l-container">
          <form className="create" onSubmit={handleSubmit}>
            <div className="create-button">
              <button className="create-button-link create-button-save">Save Post</button>
              <button className="create-button-link create-button-cancel" onClick={handleClickCancel}>Cancel</button>
            </div>
            <textarea
              className="create-title"
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
              {image !== '' &&  <img className="create-file-image" src={image} alt="Preview" /> }
            </div>
            <textarea
              className="create-content"
              label="Content"
              name="content"
              placeholder="Content"
              onChange={e => setContent(e.target.value)}
              value={content}
              />
          </form>
        </div>
      </div>
      {showModal ?
        <Modal handleClickYes={handleClickYes} handleClickNo={handleClickNo} />
      : null}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation addPost($id: Int, $title: String!, $content: String, $image: String) {
    addPost(post: {id: $id, title: $title, content: $content, image: $image}) {
      id
      title
      content
      image
    }
  }
`

export default CreatePostPage ;
