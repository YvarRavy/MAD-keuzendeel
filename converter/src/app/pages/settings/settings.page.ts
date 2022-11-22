import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  isChecked = false;
  constructor() {
    // Listen for changes to the prefers-color-scheme media query
   }

  ngOnInit() {
  }

  toggleTheme(event: any) 
  {
    document.body.toggleAttribute('color-theme-dark');
  }

  checkToggle(shouldCheck: any) {
    this.isChecked = shouldCheck;
  }

}
