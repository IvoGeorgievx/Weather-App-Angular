import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrentWeather } from 'src/app/types/currentWeather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css'],
})
export class CityDetailsComponent implements OnInit {
  cityWeather: CurrentWeather[] = [];
  isLoading: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const cityId = this.route.snapshot.paramMap.get('id');
    if (cityId) {
      this.isLoading = true;
      this.weatherService.getCurrentWeather(cityId).subscribe((data) => {
        this.cityWeather = data;
        this.isLoading = false;
      });
    }
  }
}
