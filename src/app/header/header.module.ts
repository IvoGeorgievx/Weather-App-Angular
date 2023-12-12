import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HeaderComponent } from './header/header.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { ReusablesModule } from '../reusables/reusables.module';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, ThemeToggleComponent, NavigationComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    ReusablesModule,
    RouterModule,
    MatSlideToggleModule,
  ],
  exports: [HeaderComponent, ThemeToggleComponent, NavigationComponent],
})
export class HeaderModule {}
