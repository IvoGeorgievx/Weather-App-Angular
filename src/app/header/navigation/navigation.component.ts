import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isDarkTheme: boolean = false;

  onThemeToggle(event: MatSlideToggleChange) {
    const body = document.getElementsByTagName('body')[0];
    if (event.checked) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      this.isDarkTheme = true;
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      this.isDarkTheme = false;
    }
  }
}
