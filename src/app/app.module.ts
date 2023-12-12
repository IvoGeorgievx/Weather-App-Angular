import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './header/header.module';
import { MainModule } from './main/main.module';
import { FavoritesModule } from './favorites/favorites.module';
import { StoreModule } from '@ngrx/store';

import { cityReducer } from './store/city/city.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HeaderModule,
    AppRoutingModule,
    MainModule,
    FavoritesModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    StoreModule.forRoot({ favoriteCities: cityReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
