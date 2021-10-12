import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DayForecast } from '../../../models/day-forecast';
import { LocationsService } from '../../../services/locations.service';
import { ZipCode } from '../../../models/zip-code';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  weatherForecast$: Observable<Observable<DayForecast>[]> | undefined;
  private readonly inProgress: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  get inProgress$(): Observable<boolean> {
    return this.inProgress.asObservable().pipe(
      map(v => !!v),
      distinctUntilChanged(),
    );
  }

  constructor(
    private readonly locations: LocationsService,
  ) {
  }

  ngOnInit(): void {
    this.weatherForecast$ = this.locations.weatherForecast$;
  }

  addLocation(zipCode: ZipCode): void {
    this.inProgress.next(zipCode);
    this.locations.addLocation(zipCode);
  }

  removeLocation(zipCode: ZipCode): void {
    this.locations.removeLocation(zipCode);
  }

  onReady(zipCode: ZipCode) {
    if (this.inProgress.value === zipCode) {
      this.inProgress.next(null);
    }
  }
}
