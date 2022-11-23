import { Component, OnInit } from '@angular/core';
import { ConversionService } from '@services/conversion.service';
import { SettingsService } from '@services/settings.service';
import { Observable, of } from 'rxjs';
import { Result } from '@entities/result';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.page.html',
  styleUrls: ['./converter.page.scss'],
})
export class ConverterPage implements OnInit {
  constructor(
    public conversionService: ConversionService,
    public settingsService: SettingsService,
    ) { }

  ngOnInit() {
  }

}
