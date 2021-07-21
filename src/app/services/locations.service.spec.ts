import { LocationsService } from './locations.service';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DayForecast } from '../models/day-forecast';

describe('LocationsService', () => {
  let service: LocationsService;
  let storageSpy: {
    get: jasmine.Spy,
    set: jasmine.Spy,
  };
  let weatherApiSpy: {
    getCurrentWeather: jasmine.Spy,
  };

  const init = () => service = new LocationsService(
    storageSpy as any,
    weatherApiSpy as any,
  )

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('BrowserStorageService', ['get', 'set']);
    weatherApiSpy = jasmine.createSpyObj('WeatherApiService', ['getCurrentWeather']);
    init();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create Service and populate with zipcodes from storage', () => {
    const zipCodes = ['zipcode-1'];
    storageSpy.get.and.returnValue(JSON.stringify(zipCodes))
    init()
    expect(service.currentLocations).toEqual(['zipcode-1']);
  });

  it('should get list of locations as Observable', async () => {
    const zipCodes = ['zipcode-1'];
    storageSpy.get.and.returnValue(JSON.stringify(zipCodes))
    init()
    const result = await service.locations$.pipe(first()).toPromise();
    expect(result).toEqual(['zipcode-1']);
  });

  it('should get a forecast based on list of locations', async () => {
    const zipCodes = ['zipcode-1'];
    storageSpy.get.and.returnValue(JSON.stringify(zipCodes))
    weatherApiSpy.getCurrentWeather.and.returnValue('fake-observable');
    init()
    const result = await service.weatherForecast$.pipe(first()).toPromise();
    expect(result).toEqual(['fake-observable' as unknown as Observable<DayForecast>]);
    expect(weatherApiSpy.getCurrentWeather).toHaveBeenCalledWith('zipcode-1');
  });

  describe('add location', () => {
    it('should add location to list of locations', async () => {
      service.addLocation('zipcode-1');
      service.addLocation('zipcode-2');
      expect(service.currentLocations).toEqual(['zipcode-1', 'zipcode-2']);
    });

    it('should store updated locations in storage', async () => {
      service.addLocation('zipcode-1');
      service.addLocation('zipcode-2');
      expect(storageSpy.set).toHaveBeenCalledWith('zip-code-storage-key', JSON.stringify(['zipcode-1', 'zipcode-2']));
    });
  })

  describe('remove location', () => {
    it('should remove location to list of locations', async () => {
      service.addLocation('zipcode-1');
      service.addLocation('zipcode-2');
      service.removeLocation('zipcode-2');
      expect(service.currentLocations).toEqual(['zipcode-1']);
    });

    it('should store updated locations in storage', async () => {
      service.addLocation('zipcode-1');
      service.addLocation('zipcode-2');
      service.removeLocation('zipcode-2');
      expect(storageSpy.set).toHaveBeenCalledWith('zip-code-storage-key', JSON.stringify(['zipcode-1']));
    });
  })

  it('should check if zipcode exists in list of locations', async () => {
    service.addLocation('zipcode-1');
    expect(service.hasLocation('zipcode-1')).toBeTrue();
    expect(service.hasLocation('zipcode-2')).toBeFalse();
  });
});
