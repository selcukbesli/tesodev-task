import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import ListItem from '../components/common/ListItem/ListItem';
import NoResultsFound from '../components/common/NotFound/NoResultsFound';
import Button from '../components/ui/Button/Button';
import Input from '../components/ui/Input/Input';
import Modal from '../components/ui/Modal/Modal';
import Pagination from '../components/ui/Pagination/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import { sortData } from '../utils/sortData';
import classes from './Results.module.css';

const Results = () => {
  const [data] = useLocalStorage('data');
  const [input, setInput] = useState('');
  const [filterValue, setfilterValue] = useState(null);
  const [error, setError] = useState(false);

  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [orderBy, setOrderBy] = useState('nameAscending');
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = (e) => {
    setShowModal(true);
  };

  const { search } = useLocation();
  const { page } = useParams();
  const history = useHistory();

  useEffect(() => {
    const loc = new URLSearchParams(search);
    const searchBy = loc.get('searchBy');
    const orderBy = loc.get('orderBy');

    setOrderBy(orderBy);
    setInput(searchBy);
    setfilterValue(searchBy);
  }, [search]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (error) {
      setFilteredAndSortedData([]);
      return;
    }

    const shallowArray = [...data];
    const sortedArray = sortData(shallowArray, orderBy);
    const sortedAndFilteredArray = sortedArray?.filter((item) =>
      item.name?.match(new RegExp(filterValue), 'i')
    );
    setFilteredAndSortedData(sortedAndFilteredArray);
  }, [data, orderBy, filterValue, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    input.trim().length === 0 ? setError(true) : setError(false);

    if (error) {
      setfilterValue(null);
    } else {
      setfilterValue(input.trim());
      history.push(`/results/1?searchBy=${input}&orderBy=nameAscending`);
    }
  };

  const datasPerPage = 6;
  const indexOfLastData = page * datasPerPage;
  const indexOfFirstData = indexOfLastData - datasPerPage;

  const currentDatas = filteredAndSortedData?.slice(indexOfFirstData, indexOfLastData);

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <img src="/logo.png" alt="logo" height="63px" width="149px" />
      </div>
      <div className={classes.main}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Input
            input={input}
            setInput={setInput}
            error={error}
            placeholder="Enter a valid input to search by name"
          />
          <Button type="submit"> Search </Button>
        </form>
        {filteredAndSortedData?.length > 0 && (
          <>
            <div className={classes.order}>
              <Button buttonClear={true} onClick={handleShow}>
                <img src="/arrows.png" alt="arrow" width="26" height="24" />
                Order By
                <Modal showModal={showModal} handleClose={handleClose} />
              </Button>
            </div>
            {currentDatas?.map((item) => (
              <ListItem
                key={item.name}
                name={item.name}
                date={item.date}
                country={item.country}
                city={item.city}
                email={item.email}
              />
            ))}
            <Pagination datasPerPage={datasPerPage} totalDatas={filteredAndSortedData?.length} />
          </>
        )}
        {filteredAndSortedData.length === 0 && <NoResultsFound />}
      </div>
    </div>
  );
};

export default Results;
