import React from 'react';
import classes from './Input.module.css';

const Input = ({ placeholder, input, setInput, error }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;

    setInput(value);
  };

  return (
    <div className={classes.container}>
      <input
        placeholder={placeholder}
        className={`${classes.input} ${error && classes['input-error']}`}
        value={input}
        type="text"
        onChange={handleInputChange}
      />
      {error && <p className={classes.error}>Plase enter a valid Input!</p>}
    </div>
  );
};

export default Input;
