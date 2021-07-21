import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DayForecast } from '../../../models/day-forecast';

@Component({
  selector: 'app-multi-day-forecast',
  templateUrl: './multi-day-forecast.component.html',
  styleUrls: ['./multi-day-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiDayForecastComponent {
  @Input() forecast: DayForecast[] | undefined;
}
