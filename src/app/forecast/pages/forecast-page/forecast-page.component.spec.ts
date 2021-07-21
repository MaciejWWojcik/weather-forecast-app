import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastPageComponent } from './forecast-page.component';
import { WeatherApiService } from '../../../services/weather-api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MultiDayForecastComponent } from '../../components/multi-day-forecast/multi-day-forecast.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ForecastPageComponent', () => {
  let component: ForecastPageComponent;
  let fixture: ComponentFixture<ForecastPageComponent>;
  let activatedRouteSpy: {
    paramMap: any,
  };

  beforeEach(async () => {
    const weatherApiSpy = jasmine.createSpyObj('WeatherApiService', ['getWeatherForecast']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], ['paramMap']);

    (Object.getOwnPropertyDescriptor(activatedRouteSpy, 'paramMap')?.get as jasmine.Spy).and.returnValue(of({
      has: (key: string) => false,
    }));


    await TestBed.configureTestingModule({
      declarations: [ForecastPageComponent, MultiDayForecastComponent],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: WeatherApiService, useValue: weatherApiSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
