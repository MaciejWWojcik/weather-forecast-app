import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LocationInputComponent } from './components/location-input/location-input.component';
import { SingleDayForecastComponent } from './components/single-day-forecast/single-day-forecast.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CountryInputComponent } from './components/country-input/country-input.component';


@NgModule({
  declarations: [
    HomePageComponent,
    LocationInputComponent,
    SingleDayForecastComponent,
    CountryInputComponent,
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
