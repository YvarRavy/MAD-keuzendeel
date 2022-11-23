import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HistoryService } from '@services/history.service';
import { ModalComponent } from './modal/modal.component';

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

  public history: Array<any> = [];

  ngOnInit() { }

  ionViewWillEnter() {
    this.history = this.historyService.getHistory();
  }

  public async openModal(index: Number)
  {
    let item = this.historyService.getHistoryItem(Number(index));
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: {
        item: item
      },
      cssClass: "",
      swipeToClose: true, // only works for ios
    });
    await modal.present();
  }
}
