import React from 'react';
import ListItem from '../../common/ListItem/ListItem';
import classes from './SearchList.module.css';
import Button from '../../ui/Button/Button';
import { useHistory } from 'react-router-dom';
import NoResultsFound from '../../common/NotFound/NoResultsFound';

const SearchList = ({ data, searchBy }) => {
  const history = useHistory();

  return (
    <div className={classes.container}>
      <div>
        {data
          ?.filter((_, index) => index < 3)
          .map((item) => (
            <ListItem
              key={item.name}
              name={item.name}
              date={item.date}
              country={item.country}
              city={item.city}
              email={item.email}
            />
          ))}
        {data?.length > 2 && (
          <div className={classes['button-container']}>
            <Button
              buttonClear={true}
              onClick={() =>
                history.push({
                  pathname: '/results/1',
                  search: `searchBy=${searchBy}&orderBy=nameAscending`,
                })
              }>
              Show more...
            </Button>
          </div>
        )}
        {data?.length === 0 && <NoResultsFound />}
      </div>
    </div>
  );
};

export default SearchList;
