export interface Country {
  id: number;
  name: string;
  alpha3Code: string;
}

export interface ApiCountry {
  name: string;
  alpha3Code: string;
  independent: boolean;
}