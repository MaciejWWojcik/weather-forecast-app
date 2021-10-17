import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BrowserStorageService } from './browser-storage.service';
import { WeatherApiService } from './weather-api.service';
import { DayForecast } from '../models/day-forecast';
import { map, switchMap } from 'rxjs/operators';
import { refresher } from './observable-utils/refresher';
import { Location } from '../models/location';
import { ZipCode } from '../models/zip-code';

const ZipCodeStorageKey = 'zip-code-storage-key';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly locations: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);

  get currentLocations(): Location[] {
    return this.locations.value;
  }

  get locations$(): Observable<Location[]> {
    return this.locations.asObservable();
  }

  get weatherForecast$(): Observable<Observable<DayForecast>[]> {
    const forecast$ = (location: Location) => this.weatherApi.getCurrentWeather(location.zipCode, location.countryCode);
    const inInterval = (location: Location) => refresher().pipe(switchMap(() => forecast$(location)));

    // I'm not using switchMap to flatten Observables because I don't want to force waiting for all data to display anything
    return this.locations$.pipe(
      map(locations => locations.map(inInterval)),
    );
  }

  constructor(
    private readonly storage: BrowserStorageService,
    private readonly weatherApi: WeatherApiService,
  ) {
    const data = this.storage.get(ZipCodeStorageKey);
    if (data) {
      const locations = JSON.parse(data) || [];
      this.locations.next(locations);
    }
  }

  addLocation(location: Location): void {
    const locations = [...this.currentLocations, location];
    this.locations.next(locations);
    this.storage.set(ZipCodeStorageKey, JSON.stringify(locations));
  }

  removeLocation(location: Location): void {
    const locations = [...this.currentLocations];
    const index = locations.findIndex(e => e.zipCode === location.zipCode && e.countryCode === location.countryCode);
    locations.splice(index, 1);
    this.locations.next(locations);
    this.storage.set(ZipCodeStorageKey, JSON.stringify(locations));
  }

  hasLocation(zipCode: ZipCode): boolean {
    return this.currentLocations.some(e => e.zipCode === zipCode);

  }
}
