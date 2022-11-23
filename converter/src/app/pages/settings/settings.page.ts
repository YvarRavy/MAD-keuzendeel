import { Component, OnInit } from '@angular/core';
import { SettingsService } from "@services/settings.service";
import { ConversionService } from "@services/conversion.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    public settingsService: SettingsService,
    public conversionService: ConversionService
  ) { }

  ngOnInit() {
  }
}
