import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from 'src/app/services/weather.service';
import { CurrentWeather } from 'src/app/types/currentWeather';
import { Store } from '@ngrx/store';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  addFavoriteCity,
  removeFavoriteCity,
} from '../../store/city/city.actions';
import { FavoriteCity } from '../../types/home.type';
import { selectFavoriteCities } from '../../store/city/city.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('600ms', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  cityName: string = '';
  locationKey: string = '';
  currentWeather: CurrentWeather | null = null;
  fiveDayForecast: any = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  currentCity: any;
  displayedCityName: string = 'Sofia';
  favoriteCities: FavoriteCity[] = [];

  constructor(private store: Store, private weatherService: WeatherService) {
    this.store
      .select(selectFavoriteCities)
      .subscribe((data: FavoriteCity[]) => {
        this.favoriteCities = data;
      });
  }

  ngOnInit(): void {
    this.searchLocation('Sofia');
  }

  searchLocation(cityName: string = this.cityName) {
    if (!cityName.trim()) {
      this.isLoading = false;
      this.errorMessage = 'Please enter a city name';
      return;
    }
    this.currentCity = '';
    this.currentWeather = null;
    this.fiveDayForecast = null;
    this.isLoading = true;
    this.errorMessage = '';
    this.weatherService.searchLocations(cityName).subscribe((data) => {
      const firstResult = data[0];
      this.displayedCityName = cityName;
      this.currentCity = firstResult;
      if (firstResult) {
        this.locationKey = firstResult.Key;
        this.getWeatherData();
      } else {
        this.errorMessage = `No results for ${this.cityName}`;
      }
      this.isLoading = false;
    });
  }

  getWeatherData() {
    this.weatherService
      .getCurrentWeather(this.locationKey)
      .subscribe((currentWeather) => {
        this.currentWeather = currentWeather[0];
      });
    this.weatherService
      .getFiveDayForecast(this.locationKey)
      .subscribe((fiveDayForecast) => {
        this.fiveDayForecast = fiveDayForecast;
      });
  }

  submitHandler(form: NgForm) {
    if (form.valid) {
      this.cityName = form.value.city;
      this.searchLocation(this.cityName);
    }
  }

  markAsFavorite(city: any) {
    if (this.currentWeather) {
      const favoriteCity: FavoriteCity = {
        id: city.Key,
        name: city.LocalizedName,
        currentWeather: this.currentWeather,
      };
      this.store.dispatch(addFavoriteCity({ city: favoriteCity }));
    }
  }

  removeFavoriteCity(city: FavoriteCity) {
    this.store.dispatch(removeFavoriteCity({ city }));
  }

  isFavorite(city: any): boolean {
    return this.favoriteCities.some(
      (favoriteCity) => favoriteCity.id === city.Key
    );
  }
}
