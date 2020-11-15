import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsDashboardComponent } from './components/principal/principal.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ProjectsDashboardComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule
  ],
  exports: [ProjectsDashboardComponent]
})
export class ProjectsDashboardModule { }
