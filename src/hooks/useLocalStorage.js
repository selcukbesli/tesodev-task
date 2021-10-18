import { useEffect, useState } from 'react';
import Data from '../data/classes/Data';

const useLocalStorage = (key) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const localJSON = localStorage.getItem(key);

    if (localJSON === null) {
      return [null];
    }

    const localData = JSON.parse(localJSON).data;

    const dataArray = [];
    localData.map((item) => dataArray.push(new Data(...item)));

    setData(dataArray);
  }, [key]);

  return [data];
};

export default useLocalStorage;
