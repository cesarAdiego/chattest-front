import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { OptionsPopupComponent } from '../options-popup/options-popup.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [DialogService]
})
export class NavbarComponent implements OnInit {

  constructor(public dialogService: DialogService, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  openConfigurationPopup() {
    this.translate.get('LANGUAGE_SELECTOR.POPUP_TITLE').subscribe((res: string) => {
      const ref = this.dialogService.open(OptionsPopupComponent, {
        header: res,
        width: '70%',
        height: '70%'
      });
    });
  }

}
