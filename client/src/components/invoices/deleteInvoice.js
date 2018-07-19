/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const DeleteInvoice = (props) => {
  return (
    <div className='DeleteModal'>
      <div className='DeleteModal-Box'>
        <p> Are you sure you want to delete this? </p>
        <Link to='/'>
          <button
            type='button'
            onClick={() => {
              props.deleteNote(props._id);
            }}
            className='DeleteModal-Box-Delete'
          >
          Delete
          </button>
        </Link>
        <button
          type='button'
          onClick={() => {
            props.toggleModal();
          }}
          className="NoDelete"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default connect(null, )(DeleteInvoice);
/* eslint-enable */
