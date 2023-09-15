import PropTypes from 'prop-types';

export const ContactListItem = ({ id, name, number, onButtonClick }) => {
  return (
    <li key={id}>
      {name}: {number}{' '}
      <button type="button" onClick={() => onButtonClick(id)}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};
