import { useState } from 'react';

const usePostYii2DataProviderService = () => {
  
  const [service, setService] = useState({
    status: 'loading'
  });

  const publishYii2DataProvider = (api, columnsHeader, {page, rowsPerPage, filters = {}}) => {
    setService({ status: 'loading' });

    const fields = columnsHeader.map((row) => row.name).join(',');

    let filtersParse  = [] ;

    Object.keys(filters).forEach(keyFilter => {
      filtersParse.push(`${keyFilter}=${filters[keyFilter]}`);
    });

    const url = `${api.url}?per-page=${rowsPerPage}&fields=${fields}&page=${++page}&${filtersParse.join('&')}`;
    api.method = 'GET';

    return new Promise((resolve, reject) => {
      fetch(url, api)
        .then(response => {
          if (response.status !== 200) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then(response => {
          return setService({ status: 'loaded', payload: response });
        })
        .catch(error => setService({ status: 'error', error: error.message }));
    });
  };

  const Yii2DataProviderDeleteService = (api , id, callback) => {
    setService({ status: 'loading' });
    const url = `${api.url}/${id}`;
    api.method = 'DELETE';

    return new Promise((resolve, reject) => {
      fetch(url, api)
        .then(response => {
          if (response.status !== 204) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          callback(id);
        })
        .catch(error => setService({ status: 'error', error: error.message }));
    });
  };

  return {
    service,
    Yii2DataProviderDeleteService,
    publishYii2DataProvider
  };
};

export default usePostYii2DataProviderService;