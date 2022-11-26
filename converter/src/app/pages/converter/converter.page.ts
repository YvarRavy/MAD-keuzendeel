import { Component, OnInit } from '@angular/core';
import { ConversionService } from '@services/conversion.service';
import { SettingsService } from '@services/settings.service';
import { Observable, of } from 'rxjs';
import { Result } from '@entities/result';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})
export class ConverterPage implements OnInit {
  constructor(
    public conversionService: ConversionService,
    public settingsService: SettingsService,
    private toastController: ToastController
    ) { }

  ngOnInit() {
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
