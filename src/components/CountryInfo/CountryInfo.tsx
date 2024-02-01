import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ApiCountryExtended, Border } from '../../types';

interface Props {
  name: string;
  borders: string[];
  capital: string;
  population: number;
  flag: string;
  region: string;
  area: number;
}

const CountryInfo: React.FC<Props> = ({
  name,
  borders,
  capital,
  population,
  flag,
  region,
  area,
}) => {
  const [borderCountries, setBorderCountries] = useState<Border[]>([]);

  const fetchData = useCallback(async () => {
    const promises = borders.map(async (alpha3Code): Promise<Border> => {
      const { data: country } = await axios.get<ApiCountryExtended>(
        `alpha/${alpha3Code}`
      );
      return {
        name: country.name,
      };
    });

    const borderCountries = await Promise.all(promises);
    setBorderCountries(borderCountries);
  }, [borders]);

  useEffect(() => {
    if (borders) {
      fetchData();
    }
  }, [fetchData]);

  return (
    <div className='clearfix'>
      <img
        src={flag}
        alt='flag'
        className='float-end'
        style={{ maxWidth: '400px', height: 'auto' }}
      />
      <h1>{name}</h1>
      <p>
        <span className='fw-bold'>Capital:</span> {capital}
      </p>
      <p>
        <span className='fw-bold'>Population:</span> {population}
      </p>
      <p>
        <span className='fw-bold'>Region:</span> {region}
      </p>
      <p>
        <span className='fw-bold'>Area:</span> {area} km²
      </p>
      <span className='fw-bold'>Has borders with:</span>
      {borders && (
        <ul>
          {borderCountries.map((border) => (
            <li key={border.name}>{border.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryInfo;
