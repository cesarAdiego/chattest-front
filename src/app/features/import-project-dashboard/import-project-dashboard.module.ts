import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportProjectDashboardComponent } from './components/principal/principal.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

import { TranslateModule } from '@ngx-translate/core';

import { ImportUploadFileComponent } from './components/import-upload/import-upload-file.component';


@NgModule({
  declarations: [ImportProjectDashboardComponent, ImportUploadFileComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    FileUploadModule,
    InputTextModule,
    StepsModule,
    ToastModule,
    TranslateModule
  ],
  exports: [ImportProjectDashboardComponent, ImportUploadFileComponent]
})
export class ImportProjectDashboardModule { }
