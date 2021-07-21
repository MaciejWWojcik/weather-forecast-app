import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LocationInputComponent } from './components/location-input/location-input.component';
import { SingleDayForecastComponent } from './components/single-day-forecast/single-day-forecast.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomePageComponent,
    LocationInputComponent,
    SingleDayForecastComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class HomePageModule {
}
