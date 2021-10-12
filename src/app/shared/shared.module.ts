import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherIconPipe } from './pipes/weather-icon.pipe';
import { TaskButtonComponent } from './components/task-button/task-button.component';


@NgModule({
  declarations: [
    WeatherIconPipe,
    TaskButtonComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WeatherIconPipe,
    TaskButtonComponent,
  ]
})
export class SharedModule {
}
