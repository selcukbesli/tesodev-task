import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Modal.module.css';
import { useParams, useLocation } from 'react-router-dom';

const BackDrop = () => <div className={classes.backdrop} />;

const Modal = ({ showModal, handleClose }) => {
  const { page } = useParams();
  const { search } = useLocation();

  const handleModalClose = (e) => {
    e.stopPropagation();
    handleClose();
  };

  const searchParams = new URLSearchParams(search);
  const searchBy = searchParams.get('searchBy');

  if (!showModal) {
    return null;
  }

  return (
    <div onClick={handleModalClose}>
      <BackDrop />
      <div className={classes.container}>
        <NavLink
          key="nameAscending"
          to={`/results/${page}?searchBy=${searchBy}&orderBy=nameAscending`}>
          Name ascending
        </NavLink>
        <NavLink
          key="nameDescending"
          to={`/results/${page}?searchBy=${searchBy}&orderBy=nameDescending`}>
          Name descending
        </NavLink>
        <NavLink
          key="yearAscending"
          to={`/results/${page}?searchBy=${searchBy}&orderBy=yearAscending`}>
          Year ascending
        </NavLink>
        <NavLink
          key="yearDescending"
          to={`/results/${page}?searchBy=${searchBy}&orderBy=yearDescending`}>
          Year descending
        </NavLink>
      </div>
    </div>
  );
};

export default Modal;
