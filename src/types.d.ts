export interface Country {
  name: string;
  alpha3Code: string;
}

export interface ApiCountry {
  name: string;
  alpha3Code: string;
  independent: boolean;
}

export interface ApiCountryExtended {
  name: string;
  borders: string[];
  capital: string;
  population: number;
  flag: string;
  region: string;
  area: number;
}

export interface Border {
  name: string;
}
