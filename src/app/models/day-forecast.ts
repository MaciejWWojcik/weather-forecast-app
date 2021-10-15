import { WeatherConditions } from './weather-conditions';

export interface DayForecast {
  temperature: number;
  temperatureMin: number;
  temperatureMax: number;
  city: string;
  zipCode: string;
  countryCode: string;
  conditions: WeatherConditions;
  date: Date;
}
