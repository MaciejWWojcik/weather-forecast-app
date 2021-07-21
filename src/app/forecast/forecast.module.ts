import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastPageComponent } from './pages/forecast-page/forecast-page.component';
import { MultiDayForecastComponent } from './components/multi-day-forecast/multi-day-forecast.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ForecastPageComponent,
    MultiDayForecastComponent,
  ],
  imports: [
    CommonModule,
    ForecastRoutingModule,
    SharedModule,
  ]
})
export class ForecastModule {
}
