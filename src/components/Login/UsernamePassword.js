import React from 'react';
import PropTypes from 'prop-types';

const UsernamePassword = ({ field, value, label, error, type, onChange, checkUserExists }) => {
  return (
    <div style= {{padding: "12px"}}>
      <label style= {{paddingRight: "8px"}}>{label}</label>
      <input style={{padding: "10px"}}
        onChange={onChange}
        onBlur={checkUserExists}
        value={value}
        type={type}
        name={field}
      />

      <div>{error && <span className="error-message">{error}</span>}</div>

     </div>  );
}

UsernamePassword.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func
}

UsernamePassword.defaultProps = {
  type: 'text'
}

export default UsernamePassword;