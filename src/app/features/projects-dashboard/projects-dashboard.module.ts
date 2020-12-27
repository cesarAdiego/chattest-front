import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProjectsDashboardComponent } from './components/principal/principal.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast'; 
import { RippleModule } from 'primeng/ripple';

import { FileSaverModule } from 'ngx-filesaver';

import { ProjectPopupComponent } from './components/project-popup/project-popup.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BotTypeSelectorModule } from 'src/app/common/modules/bot-type-selector/bot-type-selector.module';
import { LanguageSelectorModule } from 'src/app/common/modules/language-selector/language-selector.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectSearcherComponent } from './components/project-searcher/project-searcher.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { BotTypeDropdownModule } from 'src/app/common/modules/bot-type-dropdown/bot-type-dropdown.module';
import { LanguagesDropdownModule } from 'src/app/common/modules/languages-dropdown/languages-dropdown.module';

@NgModule({
  declarations: [ProjectsDashboardComponent, ProjectPopupComponent, ProjectSearcherComponent, ProjectItemComponent, ProjectsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    ToggleButtonModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    InputTextModule,
    MenuModule,
    MultiSelectModule,
    ToastModule,
    RippleModule,
    FileSaverModule,
    BotTypeSelectorModule,
    BotTypeDropdownModule,
    LanguageSelectorModule,
    LanguagesDropdownModule,
    TranslateModule
    ],
  exports: [ProjectsDashboardComponent],
  providers: [ConfirmationService, MessageService],
  entryComponents: [
    ProjectPopupComponent
  ]
})
export class ProjectsDashboardModule { }
