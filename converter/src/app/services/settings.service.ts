import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { from, first, switchMap } from 'rxjs';
import { Settings } from '@entities/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings: Settings = {
    darkTheme: false,
    defaultUnit: "Kilo", 
    historyLimit: 20,
  };

  constructor(private localService: LocalService) {
  }

  async init()
  {
    from(this.localService.get('settings')).subscribe(async items => {
      if (items == null) {
        await this.setDefaults();
      } 
      await this.getDefaults();
    });
  }

  private async getDefaults()
  {
    const self = this;
    return await from(this.localService.get('settings')).subscribe(settings => {
      if (settings == undefined) {
        return;
      }
      self.settings = settings;
      if (settings.darkTheme == true && !document.body.hasAttribute('color-theme-dark')) 
        document.body.toggleAttribute('color-theme-dark');
    })
  }

  private async setDefaults(): Promise<any> 
  {
    return await this.localService.set('settings', this.settings)
  }

  toggleTheme(event: any) 
  {
    this.settings.darkTheme = event.detail.checked;
    document.body.toggleAttribute('color-theme-dark');
    this.setDefaults();
  }

  setDefaultUnit(event: any)
  {
    this.settings.defaultUnit = event.detail.value;
    this.setDefaults();
  }
  
  setHistoryLimit(event: any) {
    this.settings.historyLimit = event.detail.value;
    this.setDefaults();
  }

  getUnit(): string
  {
    return <string> this.settings.defaultUnit;
  }

  public getHistoryLimit()
  {
    return <number> this.settings.historyLimit;
  }
}
