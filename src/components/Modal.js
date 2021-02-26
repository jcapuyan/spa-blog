import React from 'react';

import '../css/Modal.scss';

const Modal = ({ handleClickYes, handleClickNo }) => {
  return (
    <div className="modal">
      <div className="modal-inner">
        <p className="modal-message">Do you really want to cancel?</p>
        <button className="modal-button modal-button-first" onClick={handleClickYes}>Yes</button>
        <button className="modal-button" onClick={handleClickNo}>No</button>
      </div>
    </div>
  );
}

export default Modal;
