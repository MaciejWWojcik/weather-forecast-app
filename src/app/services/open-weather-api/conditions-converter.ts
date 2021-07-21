import { WeatherConditions } from '../../models/weather-conditions';
import { Weather } from './open-weather-utils';

export function conditionsConverter(data: Weather): WeatherConditions {
  const conditions: Map<string, WeatherConditions> = new Map<string, WeatherConditions>()
    .set('Thunderstorm', WeatherConditions.Thunderstorm)
    .set('Drizzle', WeatherConditions.Drizzle)
    .set('Rain', WeatherConditions.Rain)
    .set('Snow', WeatherConditions.Snow)
    .set('Atmosphere', WeatherConditions.Atmosphere)
    .set('Clouds', WeatherConditions.Clouds)
    .set('Clear', WeatherConditions.Clear);

  return conditions.get(data.main) || WeatherConditions.Unknown;
}
