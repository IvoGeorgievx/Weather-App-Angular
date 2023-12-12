import { CurrentWeather } from 'src/app/types/currentWeather';

export interface FavoriteCity {
  id: string;
  name: string;
  currentWeather: CurrentWeather;
  Key?: string;
}

export interface AppState {
  favoriteCities: FavoriteCity[];
}
