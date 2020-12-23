import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportUploadFileComponent } from './features/import-project-dashboard/components/import-upload/import-upload-file.component';
import { LastDetailsComponent } from './features/import-project-dashboard/components/last-details/last-details.component';
import { ImportProjectDashboardComponent } from './features/import-project-dashboard/components/principal/principal.component';
import { SelectTestsComponent } from './features/import-project-dashboard/components/select-tests/select-tests.component';
import { ProjectsDashboardComponent } from './features/projects-dashboard/components/principal/principal.component';
import { TestsDashboardComponent } from './features/tests-dashboard/components/principal/principal.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsDashboardComponent},
  { path: 'projects/:id/tests', component: TestsDashboardComponent},
  { path: 'projects/import', component: ImportProjectDashboardComponent,
    children: [
      { path: 'uploadFile', component: ImportUploadFileComponent},
      { path: 'select', component: SelectTestsComponent},
      { path: 'lastDetails', component: LastDetailsComponent}
    ]},
  { path: '', component: ProjectsDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
