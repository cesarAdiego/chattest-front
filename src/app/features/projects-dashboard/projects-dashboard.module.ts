import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectsDashboardComponent } from './components/principal/principal.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast'; 

import { ProjectPopupComponent } from './components/project-popup/project-popup.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BotTypeSelectorModule } from 'src/app/common/modules/bot-type-selector/bot-type-selector.module';
import { LanguageSelectorModule } from 'src/app/common/modules/language-selector/language-selector.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProjectsDashboardComponent, ProjectPopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    InputTextModule,
    MultiSelectModule,
    ToastModule,
    BotTypeSelectorModule,
    LanguageSelectorModule,
    TranslateModule
  ],
  exports: [ProjectsDashboardComponent],
  providers: [ConfirmationService, MessageService],
  entryComponents: [
    ProjectPopupComponent
  ]
})
export class ProjectsDashboardModule { }
