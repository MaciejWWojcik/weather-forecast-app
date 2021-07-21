import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherApiService } from '../weather-api.service';
import { DayForecast } from '../../models/day-forecast';
import { ConfigService } from '../config.service';
import { OpenWeatherSingleDay } from './open-weather-single-day';
import { conditionsConverter } from './conditions-converter';
import { OpenWeatherMultiDays } from './open-weather-multi-days';

@Injectable()
export class OpenWeatherApiService extends WeatherApiService {

  constructor(
    private readonly http: HttpClient,
    private readonly config: ConfigService,
  ) {
    super();
  }

  getCurrentWeather(zipCode: string): Observable<DayForecast> {
    // https://api.openweathermap.org/data/2.5/weather?zip=94040&appid=5a4b2d457ecbef9eb2a71e480b947604
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const params = this.getParams(zipCode);
    return this.http.get<OpenWeatherSingleDay>(url, { params }).pipe(
      map(data => ({
        temperature: data.main.temp,
        temperatureMin: data.main.temp_min,
        temperatureMax: data.main.temp_max,
        city: data.name,
        conditions: conditionsConverter(data.weather[0]),
        date: new Date(data.dt),
        zipCode,
      }))
    );
  }

  getWeatherForecast(zipCode: string): Observable<DayForecast[]> {
    // https://api.openweathermap.org/data/2.5/forecast/daily?zip=94040&appid=5a4b2d457ecbef9eb2a71e480b947604
    const url = 'https://api.openweathermap.org/data/2.5/forecast/daily';
    const params = this.getParams(zipCode);
    return this.http.get<OpenWeatherMultiDays>(url, { params }).pipe(
      map(data => data.list.map(dayData => ({
        temperature: dayData.temp.day,
        temperatureMin: dayData.temp.min,
        temperatureMax: dayData.temp.max,
        city: data.city.name,
        conditions: conditionsConverter(dayData.weather[0]),
        date: new Date(dayData.dt * 1000),
        zipCode,
      })))
    );
  }

  private getParams(zip: string): HttpParams {
    return new HttpParams({
      fromObject: {
        zip,
        appid: this.config.apiKey,
      }
    });
  }
}
