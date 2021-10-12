import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { DayForecast } from '../../../models/day-forecast';
import { WeatherApiService } from '../../../services/weather-api.service';
import { refresher } from '../../../services/observable-utils/refresher';

@Component({
  selector: 'app-forecast-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.scss']
})
export class ForecastPageComponent implements OnInit {

  forecast$: Observable<DayForecast[]> | undefined;

  private readonly routeParam = 'zip';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: WeatherApiService,
  ) {
  }

  ngOnInit(): void {
    this.forecast$ = this.route.paramMap.pipe(
      filter(params => params.has(this.routeParam)),
      map(params => params.get(this.routeParam) as string),
      switchMap(zipcode => refresher().pipe(map(_ => zipcode))),
      switchMap(zipcode => this.api.getWeatherForecast(zipcode)),
      map(forecast => forecast.slice(0, 5)),
    );
  }

}
