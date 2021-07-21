import { City, Temp, Weather } from './open-weather-utils';


export interface List {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  pressure: number;
  humidity: number;
  weather: Weather[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain?: number;
}

export interface OpenWeatherMultiDays {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: List[];
}
