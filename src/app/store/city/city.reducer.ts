import { Action } from '@ngrx/store';
import { addFavoriteCity, removeFavoriteCity } from './city.actions';
import { AppState, FavoriteCity } from '../../types/home.type';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const initialState: AppState = {
  favoriteCities: [],
};

export function cityReducer(
  state = initialState,
  action: Action & { city?: FavoriteCity }
): AppState {
  switch (action.type) {
    case addFavoriteCity.type:
      if (action.city) {
        const newState = {
          ...state,
          favoriteCities: [...state.favoriteCities, action.city],
        };
        return newState;
      }
      return state;
    case removeFavoriteCity.type:
      if (action.city) {
        const newState = {
          ...state,
          favoriteCities: state.favoriteCities.filter(
            (city) => city.id !== action.city?.Key
          ),
        };
        return newState;
      }
      return state;
    default:
      return state;
  }
}

export const selectFeature = createFeatureSelector<AppState>('favoriteCities');

export const selectFavoriteCities = createSelector(
  selectFeature,
  (state) => state.favoriteCities
);
