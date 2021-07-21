import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DayForecast } from '../../../models/day-forecast';
import { LocationsService } from '../../../services/locations.service';
import { ZipCode } from '../../../models/zip-code';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  weatherForecast$: Observable<Observable<DayForecast>[]> | undefined;

  constructor(
    private readonly locations: LocationsService,
  ) {
  }

  ngOnInit(): void {
    this.weatherForecast$ = this.locations.weatherForecast$;
  }

  addLocation(zipCode: ZipCode): void {
    this.locations.addLocation(zipCode);
  }

  removeLocation(zipCode: ZipCode): void {
    this.locations.removeLocation(zipCode);
  }

}
