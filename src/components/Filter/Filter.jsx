import PropTypes from 'prop-types';

export const Filter = ({ onChange }) => {
  return (
    <label>
      <span>Find contacts by name</span>
      <input type="text" name="filter" onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
