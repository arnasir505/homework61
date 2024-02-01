import React from 'react';

interface Props {
  name: string;
  alpha3Code: string;
  onClick: (alpha3Code: string) => void;
}

const CountryItem: React.FC<Props> = ({ name, alpha3Code, onClick }) => {
  return (
    <button
      type='button'
      className='list-group-item list-group-item-action'
      onClick={() => onClick(alpha3Code)}
    >
      {name}
    </button>
  );
};

export default CountryItem;
