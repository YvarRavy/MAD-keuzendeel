import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HistoryService } from '@services/history.service';
import { ModalComponent } from './modal/modal.component';
import { History } from '@entities/history';
import { formatNumber } from '@angular/common';
import { from } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(
    public historyService: HistoryService,
    private modalController: ModalController
  ) { }

  public history: History[] = [];

  ngOnInit() { }

  ionViewWillEnter() {
    from(this.historyService.getHistory()).subscribe(items => {
      this.history = items;
    })
  }

  public async openModal(index: Number)
  {
//    const item: History = this.historyService.getHistoryItem(Number(index));
    from(this.historyService.getHistoryItem(Number(index))).subscribe(async item => {
        const modal = await this.modalController.create({
          component: ModalComponent,
          componentProps: {
            item: item[0]
          },
          cssClass: "",
          swipeToClose: true, // only works for ios
        });
        await modal.present();
    });
  }
}
