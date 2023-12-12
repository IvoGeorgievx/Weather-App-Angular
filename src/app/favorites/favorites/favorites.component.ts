import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, FavoriteCity } from 'src/app/types/home.type';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteCities$: Observable<any>;
  favoriteCities: any;

  constructor(private store: Store<AppState>, private router: Router) {
    this.favoriteCities$ = store.pipe(select('favoriteCities'));
  }

  ngOnInit() {
    this.favoriteCities$.subscribe((cities) => {
      console.log('Favorite cities from store:', cities.favoriteCities);
      this.favoriteCities = cities.favoriteCities;
    });
  }

  onCityClick(city: FavoriteCity) {
    this.router.navigate(['/city', city.id]);
  }
}
