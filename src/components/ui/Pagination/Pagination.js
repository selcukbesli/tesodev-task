import React from 'react';
import { useLocation, useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import classes from './Pagination.module.css';

const Pagination = ({ datasPerPage, totalDatas }) => {
  const { page } = useParams();
  const { search } = useLocation();

  const loc = new URLSearchParams(search);
  const orderBy = loc.get('orderBy');
  const searchBy = loc.get('searchBy');

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDatas / datasPerPage); i++) {
    pageNumbers.push(i);
  }

  const previousPage = +page === 1 ? page : +page - 1;
  const nextPage = +page === pageNumbers.length ? page : +page + 1;

  return (
    <nav>
      <ul className={classes.pagination}>
        <NavLink
          to={`/results/${previousPage}?searchBy=${searchBy}&orderBy=${orderBy}`}
          key="previous">
          Previous
        </NavLink>
        {pageNumbers.map((number) => {
          if (
            pageNumbers.length > 4 &&
            +number !== +page &&
            number > 2 &&
            number < pageNumbers.length - 1
          ) {
            return (
              <div className={classes.dot} key={number}>
                .
              </div>
            );
          }
          return (
            <NavLink
              key={number}
              to={`/results/${number}?searchBy=${searchBy}&orderBy=${orderBy}`}
              activeClassName={classes.active}>
              {number}
            </NavLink>
          );
        })}
        <NavLink to={`/results/${nextPage}?searchBy=${searchBy}&orderBy=${orderBy}`} key="next">
          Next
        </NavLink>
      </ul>
    </nav>
  );
};

export default Pagination;
