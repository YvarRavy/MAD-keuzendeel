import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  public item: any;

  ngOnInit() { }

  dismiss()
  {
    this.modalController.dismiss();
  }

  async copyToClipboard(value: any)
  {
    // Copy the text inside the text field
    navigator.clipboard.writeText(value);
    const toast = await this.toastController.create({
      header: 'Copied to clipboard',
      position: 'bottom',
      color: "success",
      duration: 1000,
    });
    toast.present();
    return;
  }
}
