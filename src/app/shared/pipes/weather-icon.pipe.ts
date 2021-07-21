import { Pipe, PipeTransform } from '@angular/core';
import { WeatherConditions } from '../../models/weather-conditions';

@Pipe({
  name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {

  private readonly baseUrl = 'https://www.angulartraining.com/images/weather/';
  private readonly icons: Map<WeatherConditions, string> = new Map<WeatherConditions, string>()
    .set(WeatherConditions.Atmosphere, `${this.baseUrl}/clouds.png`)
    .set(WeatherConditions.Clouds, `${this.baseUrl}/clouds.png`)
    .set(WeatherConditions.Drizzle, `${this.baseUrl}/rain.png`)
    .set(WeatherConditions.Thunderstorm, `${this.baseUrl}/rain.png`)
    .set(WeatherConditions.Rain, `${this.baseUrl}/rain.png`)
    .set(WeatherConditions.Snow, `${this.baseUrl}/snow.png`)
    .set(WeatherConditions.Clear, `${this.baseUrl}/sun.png`)

  transform(value: WeatherConditions): string {
    return this.icons.get(value) || `${this.baseUrl}/sun.png`;
  }

}
