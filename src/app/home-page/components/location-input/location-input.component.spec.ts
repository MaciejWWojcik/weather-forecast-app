import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInputComponent } from './location-input.component';
import { WeatherApiService } from '../../../services/weather-api.service';
import { LocationsService } from '../../../services/locations.service';

describe('LocationInputComponent', () => {
  let component: LocationInputComponent;
  let fixture: ComponentFixture<LocationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationInputComponent],
      providers: [
        { provide: LocationsService, useValue: jasmine.createSpyObj('LocationsService', ['hasLocation']) },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
