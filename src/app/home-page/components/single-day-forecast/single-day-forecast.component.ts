import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DayForecast } from '../../../models/day-forecast';

@Component({
  selector: 'app-single-day-forecast',
  templateUrl: './single-day-forecast.component.html',
  styleUrls: ['./single-day-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleDayForecastComponent {
  @Input() forecast: DayForecast | undefined;
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }
}
