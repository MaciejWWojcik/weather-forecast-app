import { Main, Weather } from './open-weather-utils';

export interface OpenWeatherSingleDay {
  weather: Weather[];
  main: Main;
  name: string;
  dt: string;
}

