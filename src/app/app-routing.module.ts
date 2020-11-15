import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsDashboardComponent } from './features/projects-dashboard/components/principal/principal.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsDashboardComponent},
  { path: '', component: ProjectsDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
