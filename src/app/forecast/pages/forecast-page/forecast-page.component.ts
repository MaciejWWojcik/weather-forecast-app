import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { DayForecast } from '../../../models/day-forecast';
import { WeatherApiService } from '../../../services/weather-api.service';
import { refresher } from '../../../services/observable-utils/refresher';
import { Location } from '../../../models/location';

@Component({
  selector: 'app-forecast-page',
  templateUrl: './forecast-page.component.html',
  styleUrls: ['./forecast-page.component.scss']
})
export class ForecastPageComponent implements OnInit {

  forecast$: Observable<DayForecast[]> | undefined;

  private readonly zipRouteParam = 'zip';
  private readonly countryRouteParam = 'country';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: WeatherApiService,
  ) {
  }

  ngOnInit(): void {
    this.forecast$ = this.route.paramMap.pipe(
      filter(params => params.has(this.zipRouteParam)),
      map(params => ({
        zipCode: params.get(this.zipRouteParam) as string,
        countryCode: params.get(this.countryRouteParam) as string,
      })),
      switchMap((location: Location) => refresher().pipe(map(_ => location))),
      switchMap((location: Location) => this.api.getWeatherForecast(location.zipCode, location.countryCode)),
      map(forecast => forecast.slice(0, 5)),
    );
  }

}
