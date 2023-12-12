import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from 'environment';

import { ApiResponse, CurrentWeather, Forecast } from '../types/currentWeather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private baseUrl = 'http://dataservice.accuweather.com';

  constructor(private http: HttpClient) {}

  searchLocations(query: string): Observable<any> {
    const url = `${this.baseUrl}/locations/v1/cities/search?apikey=${this.apiKey}&q=${query}`;
    return this.http.get(url);
  }

  getCurrentWeather(locationKey: string): Observable<CurrentWeather[]> {
    const url = `${this.baseUrl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}`;
    return this.http.get<CurrentWeather[]>(url);
  }

  getFiveDayForecast(locationKey: string | number): Observable<any> {
    const url = `${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}&metric=true`;
    return this.http.get<ApiResponse>(url).pipe(
      map((response) =>
        response.DailyForecasts.map((forecast: Forecast) => ({
          Date: forecast.Date,
          MinTemperature: forecast.Temperature.Minimum.Value,
          MaxTemperature: forecast.Temperature.Maximum.Value,
          DayIconPhrase: forecast.Day.IconPhrase,
          NightIconPhrase: forecast.Night.IconPhrase,
        }))
      )
    );
  }
}
