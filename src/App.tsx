import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await axios.get('v2/all?fields=alpha3Code,name');
    const allCountries = response.data.json();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <div className='container'></div>;
}

export default App;
