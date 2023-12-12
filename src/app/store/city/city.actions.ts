import { createAction, props } from '@ngrx/store';
import { FavoriteCity } from '../../types/home.type';

export const addFavoriteCity = createAction(
  '[City] Add Favorite',
  props<{ city: FavoriteCity }>()
);

export const removeFavoriteCity = createAction(
  '[City] Remove Favorite',
  props<{ city: FavoriteCity }>()
);
