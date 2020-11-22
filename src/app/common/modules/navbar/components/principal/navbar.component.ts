import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { OptionsPopupComponent } from '../options-popup/options-popup.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [DialogService]
})
export class NavbarComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }

  openConfigurationPopup() {
    const ref = this.dialogService.open(OptionsPopupComponent, {
      header: 'Opciones globales',
      width: '70%',
      height: '70%'
    });
  }

}
