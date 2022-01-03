import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { PatientsComponent } from './components/patients/patients.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/agregar-paciente', component: CreatePatientComponent },
  { path: 'dashboard/pacientes', component: PatientsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
