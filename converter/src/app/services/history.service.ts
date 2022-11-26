import { Injectable } from '@angular/core';
import { LocalService } from '@services/local.service';
import { Observable, of, from, switchMap, map, take, first, filter } from 'rxjs';
import { History } from '@entities/history';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  public history: Array<any> = [];

  constructor(
    private localService: LocalService,
    private settingsService: SettingsService
  ) { }

  public setHistoryItem(item: History): void
  {
    const self = this;
    from(this.localService.get('history')).subscribe(items => {
      if (items == null) {
        items = [];
      }
      const limit = self.settingsService.getHistoryLimit()
      if (items.length > limit) {
        items.reverse().splice(0, limit).reverse();
      }
      items.push(item);
      self.localService.set('history', items);
    });
  }

  public getHistory()
  {
    return from(this.localService.get('history')).pipe(first());
  }

  public getHistoryItem(index: number)
  {
    return from(this.localService.get('history')).pipe(
      map(items => items.filter((item: any, i: any) => i == index)),
      first()
    );
  }
}
