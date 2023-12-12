import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [FavoritesComponent, CityDetailsComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [FavoritesComponent],
})
export class FavoritesModule {}
