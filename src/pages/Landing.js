import React, { useEffect, useState } from 'react';

import Input from '../components/ui/Input/Input';
import Button from '../components/ui/Button/Button';
import SearchList from '../components/search/SearchList/SearchList';
import classes from './Landing.module.css';
import useLocalStorage from '../hooks/useLocalStorage';

const Landing = () => {
  const [data] = useLocalStorage('data');
  const [input, setInput] = useState('');
  const [filterValue, setfilterValue] = useState(null);
  const [error, setError] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (error) {
      setFilteredData([]);
      return;
    }

    const shallowArray = [...data];
    const filteredArray = shallowArray.filter((item) =>
      item.name?.match(new RegExp(filterValue), 'i')
    );

    setFilteredData(filteredArray);
  }, [data, error, filterValue]);

  const handleSubmit = (e) => {
    e.preventDefault();

    input.trim().length === 0 ? setError(true) : setError(false);

    setfilterValue(input);
  };

  return (
    <div className={classes.container}>
      <img src="/logo.png" alt="logo" height="115px" width="278px" />
      <p className={classes['logo-label']}>Search web app</p>
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div style={{ flex: 1 }}>
            <Input
              input={input}
              setInput={setInput}
              error={error}
              placeholder={'Enter a valid input to search by name'}
            />
            <SearchList data={filteredData} searchBy={input} />
          </div>
          <div className={classes.buttonContainer}>
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Landing;
