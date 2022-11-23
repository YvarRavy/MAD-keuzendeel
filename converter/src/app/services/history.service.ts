import { Injectable } from '@angular/core';
import { LocalService } from '@services/local.service';
import { Observable, of } from 'rxjs';
import { History } from '@entities/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private localService: LocalService
  ) { }

  public history: Array<any> = [];

  public setHistoryItem(item: History) 
  {
    let items = JSON.parse(<string>this.localService.getData('history')) ?? [];
    if (items.length >= 20) {
    }
    items.push(item);
    this.localService.saveData('history', JSON.stringify(items));
    return;
  }

  public getHistory()
  {
    return JSON.parse(<string>this.localService.getData('history')) ?? [];
  }

  public getHistoryItem(index: number)
  {
    return JSON.parse(<string>this.localService.getData('history'))[index];
  }
}
