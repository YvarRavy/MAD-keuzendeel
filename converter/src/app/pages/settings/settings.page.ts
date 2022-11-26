import { Component, OnInit } from '@angular/core';
import { SettingsService } from "@services/settings.service";
import { ConversionService } from "@services/conversion.service";
import { LocalService } from '@services/local.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private localService: LocalService,
    public settingsService: SettingsService,
    public conversionService: ConversionService
  ) { }
  ngOnInit(): void {
    
  }
}
