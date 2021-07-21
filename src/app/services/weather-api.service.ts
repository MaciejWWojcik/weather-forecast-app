import { Observable } from 'rxjs';
import { DayForecast } from '../models/day-forecast';

export abstract class WeatherApiService {

  abstract getCurrentWeather(zipCode: string): Observable<DayForecast>;

  abstract getWeatherForecast(zipCode: string): Observable<DayForecast[]>;
}
