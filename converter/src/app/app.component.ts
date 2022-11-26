import { Component } from '@angular/core';
import { LocalService } from '@services/local.service';
import { SettingsService } from '@services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private settingsService: SettingsService,
    private localService: LocalService
    ) {}

    async ngOnInit() {
      await this.localService.init();
      await this.settingsService.init();
    }
}
