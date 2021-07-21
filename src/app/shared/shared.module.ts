import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherIconPipe } from './pipes/weather-icon.pipe';


@NgModule({
  declarations: [
    WeatherIconPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WeatherIconPipe,
  ]
})
export class SharedModule {
}
