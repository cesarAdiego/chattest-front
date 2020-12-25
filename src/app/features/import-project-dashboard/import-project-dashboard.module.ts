import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImportProjectDashboardComponent } from './components/principal/principal.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

import { TranslateModule } from '@ngx-translate/core';

import { ImportUploadFileComponent } from './components/import-upload/import-upload-file.component';
import { SelectTestsComponent } from './components/select-tests/select-tests.component';
import { SelectTestCardComponent } from './components/select-test-card/select-test-card.component';
import { LastDetailsComponent } from './components/last-details/last-details.component';
import { BotTypeSelectorModule } from 'src/app/common/modules/bot-type-selector/bot-type-selector.module';


@NgModule({
  declarations: [ImportProjectDashboardComponent, ImportUploadFileComponent, SelectTestsComponent, SelectTestCardComponent, LastDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    FileUploadModule,
    InputTextModule,
    StepsModule,
    ToastModule,
    TranslateModule,
    BotTypeSelectorModule
  ],
  exports: [ImportProjectDashboardComponent, ImportUploadFileComponent, SelectTestsComponent]
})
export class ImportProjectDashboardModule { }
