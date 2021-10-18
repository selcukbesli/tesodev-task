import React from 'react';
import classes from './Button.module.css';

const Button = ({ type, onClick, children, buttonClear }) => {
  const buttonClass = buttonClear ? classes['button-clear'] : classes['button-primary'];

  return (
    <button type={type || 'button'} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
