import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherApiService } from './services/weather-api.service';
import { OpenWeatherApiService } from './services/open-weather-api/open-weather-api.service';
import { HttpClientModule } from '@angular/common/http';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: WeatherApiService, useClass: OpenWeatherApiService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
