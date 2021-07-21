import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { LocationsService } from '../../../services/locations.service';
import { LocationInputComponent } from '../../components/location-input/location-input.component';
import { SingleDayForecastComponent } from '../../components/single-day-forecast/single-day-forecast.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let locationsSpy: {
    weatherForecast$: jasmine.Spy,
    addLocation: jasmine.Spy,
    removeLocation: jasmine.Spy,
    hasLocation: jasmine.Spy,
  }

  beforeEach(async () => {
    locationsSpy = jasmine.createSpyObj('LocationsService', ['addLocation', 'removeLocation', 'hasLocation'], ['weatherForecast$']);

    await TestBed.configureTestingModule({
      declarations: [HomePageComponent, LocationInputComponent, SingleDayForecastComponent],
      providers: [
        {
          provide: LocationsService,
          useValue: locationsSpy,
        },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
