import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Result } from '@entities/result';
import { SettingsService } from './settings.service';
import { ToastController } from '@ionic/angular';
import { HistoryService } from './history.service';
import { History } from '@entities/history';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  constructor(
    public settingsService: SettingsService,
    public toastController: ToastController,
    private historyService: HistoryService
    ) { }

  public userValue: string = "";
  public userUnit: string = this.settingsService.getUnit();

  public results$: Observable<Result[]> = of([]);

  public units: Array<string> = [
    'Kilo',
    'Gram',
    'Ton',
    'Pond',
    'Ons'
  ]

  private conversion: {[key: string]: Array<any>} = {
    Kilo: [
      (value: Number) => { return {type: "Gram", value: Number(value) * 1000}},
      (value: Number) => { return {type: "Ton", value: Number(value) / 1000}},
      (value: Number) => { return {type: "Pond", value: Number(value) * 1000 / 500}},
      (value: Number) => { return {type: "Ons", value: Number(value) * 10}},
    ],
    Gram: [
      (value: Number) => { return {type: "Kilo", value: Number(value) / 1000}},
      (value: Number) => { return {type: "Ton", value: Number(value) / 1000000}},
      (value: Number) => { return {type: "Pond", value: Number(value) / 500}},
      (value: Number) => { return {type: "Ons", value: Number(value) / 100}},
    ],
    Ton: [
      (value: Number) => { return {type: "Kilo", value: Number(value) * 1000}},
      (value: Number) => { return {type: "Gram", value: Number(value) * 1000000}},
      (value: Number) => { return {type: "Pond", value: Number(value) * 1000000 / 500}},
      (value: Number) => { return {type: "Ons", value: Number(value) * 1000000 / 100}},
    ],
    Pond: [
      (value: Number) => { return {type: "Kilo", value: Number(value) / 2}},
      (value: Number) => { return {type: "Gram", value: Number(value) * 500}},
      (value: Number) => { return {type: "Ton", value: Number(value) * 500 /1000000}},
      (value: Number) => { return {type: "Ons", value: Number(value) * 5}},
    ],
    Ons: [
      (value: Number) => { return {type: "Kilo", value: Number(value) / 10}},
      (value: Number) => { return {type: "Gram", value: Number(value) * 100}},
      (value: Number) => { return {type: "Ton", value: Number(value) / 10000}},
      (value: Number) => { return {type: "Pond", value: Number(value) / 5}},
    ],
  }

  public setUserUnit(event: any)
  {
    console.log(event)
    return;
  }

  public convert(event: any)
  {
    if (!this.userValue || !this.userUnit) {
      this.showToast("Don't forget to fill in both fields")
      return;
    }
    if (isNaN(Number(this.userValue))) {
      this.showToast("User input is not a number")
      return;
    }
    let funcs = this.conversion[this.userUnit];
    let output = [];
    for(let func of funcs) {
      output.push(func(this.userValue));
    }
    let history: History = {
      unit: this.userUnit,
      date: this.getDate(),
      value: this.userValue,
      conversion: output,
    }
    this.historyService.setHistoryItem(history);
    this.results$ = of(output);
  }

  public async showToast(message: string)
  {
    const toast = await this.toastController.create({
      header: 'Oops, something went wrong 😞',
      message: message,
      position: 'bottom',
      color: "danger",
      duration: 1000,
    });
    toast.present();
    return;
  }

  private getDate(): string
  {
    var date = new Date();
    var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var date_time = current_date + " " + current_time;	
    return date_time; 
  }
}
