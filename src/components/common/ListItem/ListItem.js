import React from 'react';
import classes from './ListItem.module.css';

const ListItem = ({ name, email, date, country, city }) => {
  const year = date?.split('/')[2];

  return (
    <div className={classes.container}>
      <div style={{ flex: 1 }}>
        <p className={classes.country}>
          {country} - {city}
        </p>
        <p className={classes.name}>
          {name} - {year}
        </p>
      </div>
      <div style={{ flex: 1 }} className={classes.email}>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default ListItem;
