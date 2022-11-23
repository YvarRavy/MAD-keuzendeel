import { Injectable } from '@angular/core';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public darkTheme: any;
  public defaultUnit: string | null = "Kilo";

  constructor(private localService: LocalService) {
    this.darkTheme = localService.getData('dark-theme');
    this.defaultUnit = this.getUnit();
    if (this.darkTheme == "true" && !document.body.hasAttribute('color-theme-dark')) 
      document.body.toggleAttribute('color-theme-dark');

  }

  toggleTheme(event: any) 
  {
    let dark = event.detail.checked; 
    this.localService.saveData('dark-theme', dark.toString());
    document.body.toggleAttribute('color-theme-dark');
  }

  setDefaultUnit(event: any)
  {
    this.localService.saveData('default-unit', event.detail.value);
  }

  getUnit(): string
  {
    return <string> this.localService.getData('default-unit');
  }
}
