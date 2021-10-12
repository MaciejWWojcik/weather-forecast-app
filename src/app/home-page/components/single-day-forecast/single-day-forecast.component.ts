import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DayForecast } from '../../../models/day-forecast';
import { asyncScheduler } from 'rxjs';

@Component({
  selector: 'app-single-day-forecast',
  templateUrl: './single-day-forecast.component.html',
  styleUrls: ['./single-day-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleDayForecastComponent implements AfterViewInit {
  @Input() forecast: DayForecast | undefined;
  @Output() remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() ready: EventEmitter<void> = new EventEmitter<void>();

  ngAfterViewInit() {
    asyncScheduler.schedule(() => this.ready.emit());
  }

  onRemove(): void {
    this.remove.emit();
  }
}
