import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { timeStamp } from 'console';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  public item: any;

  ngOnInit() { }

  dismiss()
  {
    this.modalController.dismiss();
  }
}
