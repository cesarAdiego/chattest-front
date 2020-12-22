import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportUploadFileComponent } from './features/import-project-dashboard/components/import-upload/import-upload-file.component';
import { ImportProjectDashboardComponent } from './features/import-project-dashboard/components/principal/principal.component';
import { ProjectsDashboardComponent } from './features/projects-dashboard/components/principal/principal.component';
import { TestsDashboardComponent } from './features/tests-dashboard/components/principal/principal.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsDashboardComponent},
  { path: 'projects/:id/tests', component: TestsDashboardComponent},
  { path: 'projects/import', component: ImportProjectDashboardComponent,
    children: [
      { path: 'uploadFile', component: ImportUploadFileComponent}
    ]},
  { path: '', component: ProjectsDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
