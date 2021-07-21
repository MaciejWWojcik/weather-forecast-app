import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDayForecastComponent } from './multi-day-forecast.component';
import { WeatherApiService } from '../../../services/weather-api.service';

describe('MultiDayForecastComponent', () => {
  let component: MultiDayForecastComponent;
  let fixture: ComponentFixture<MultiDayForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiDayForecastComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
