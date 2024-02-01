import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ApiCountry, Country } from './types';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchData = useCallback(async () => {
    const response = await axios.get<ApiCountry[]>(
      'all?fields=alpha3Code,name'
    );
    const allCountries = response.data;
    setCountries(
      allCountries.map((country) => {
        return {
          id: Math.random(),
          name: country.name,
          alpha3Code: country.alpha3Code,
        };
      })
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='container'>
      {countries.map((country) => (
        <p>{country.name}</p>
      ))}
    </div>
  );
}

export default App;
