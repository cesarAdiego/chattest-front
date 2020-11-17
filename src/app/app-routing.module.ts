import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsDashboardComponent } from './features/projects-dashboard/components/principal/principal.component';
import { TestsDashboardComponent } from './features/tests-dashboard/components/principal/principal.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsDashboardComponent},
  { path: 'projects/:id/tests', component: TestsDashboardComponent},
  { path: '', component: ProjectsDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
