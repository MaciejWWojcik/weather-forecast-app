import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ZipCode } from '../models/zip-code';
import { BrowserStorageService } from './browser-storage.service';
import { WeatherApiService } from './weather-api.service';
import { DayForecast } from '../models/day-forecast';
import { map } from 'rxjs/operators';

const ZipCodeStorageKey = 'zip-code-storage-key';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly locations: BehaviorSubject<ZipCode[]> = new BehaviorSubject<ZipCode[]>([]);

  get currentLocations(): ZipCode[] {
    return this.locations.value;
  }

  get locations$(): Observable<ZipCode[]> {
    return this.locations.asObservable();
  }

  get weatherForecast$(): Observable<Observable<DayForecast>[]> {
    // I'm not using switchMap to flatten Observables because I don't want to force waiting for all data to display anything
    return this.locations$.pipe(
      map(locations => locations.map(zipCode => this.weatherApi.getCurrentWeather(zipCode))),
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

  addLocation(zipCode: ZipCode): void {
    const locations = [...this.currentLocations, zipCode];
    this.locations.next(locations);
    this.storage.set(ZipCodeStorageKey, JSON.stringify(locations));
  }

  removeLocation(zipCode: ZipCode): void {
    const locations = [...this.currentLocations];
    const index = locations.indexOf(zipCode);
    locations.splice(index, 1);
    this.locations.next(locations);
    this.storage.set(ZipCodeStorageKey, JSON.stringify(locations));
  }

  hasLocation(zipCode: ZipCode): boolean {
    return this.currentLocations.includes(zipCode);
  }
}
