import React from 'react';
import PropTypes from 'prop-types';
import './ContactListItem.scss';

const ContactListItem = ({ id, name, number, onDelete }) => {
  return (
    <li key={id} className="item">
      <p className="contactInfo">
        {name}: {number}
      </p>
      <button className="deleteBtn" type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactListItem;
