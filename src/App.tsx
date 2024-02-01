import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ApiCountry, ApiCountryExtended, Country } from './types';
import CountryItem from './components/CountryItem/CountryItem';
import CountryInfo from './components/CountryInfo/CountryInfo';
import Spinner from './components/Spinner/Spinner';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] =
    useState<ApiCountryExtended | null>(null);

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
    const response = await axios.get<ApiCountryExtended>(`alpha/${alpha3Code}`);
    const country = response.data;
    setSelectedCountry(country);
  };

  return (
    <div className='container'>
      <div className='row p-5'>
        <div className='col-4 overflow-auto' style={{ maxHeight: '450px' }}>
          {countries.length > 0 ? (
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
          ) : (
            <Spinner />
          )}
        </div>
        <div className='col-8 p-5'>
          {selectedCountry && (
            <CountryInfo
              name={selectedCountry.name}
              borders={selectedCountry.borders}
              capital={selectedCountry.capital}
              population={selectedCountry.population}
              flag={selectedCountry.flag}
              region={selectedCountry.region}
              area={selectedCountry.area}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
