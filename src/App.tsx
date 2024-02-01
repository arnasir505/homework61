import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ApiCountry, Country } from './types';
import CountryItem from './components/CountryItem/CountryItem';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCounty, setSelectedCountry] = useState(null);

  const fetchData = useCallback(async () => {
    const response = await axios.get<ApiCountry[]>(
      'all?fields=alpha3Code,name'
    );
    const allCountries = response.data;
    setCountries(
      allCountries.map((country) => {
        return {
          name: country.name,
          alpha3Code: country.alpha3Code,
        };
      })
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getCountryInfo = async (alpha3Code: string) => {
    const response = await axios.get(`alpha/${alpha3Code}`);
    const country = response.data;
    setSelectedCountry(country);
    console.log(country);
  };

  return (
    <div className='container'>
      <div className='row p-5'>
        <div className='col-4 overflow-auto' style={{ maxHeight: '500px' }}>
          <ul className='list-group'>
            {countries.map((country) => (
              <CountryItem
                name={country.name}
                alpha3Code={country.alpha3Code}
                onClick={getCountryInfo}
                key={country.alpha3Code}
              />
            ))}
          </ul>
        </div>
        <div className='col-8'></div>
      </div>
    </div>
  );
}

export default App;
