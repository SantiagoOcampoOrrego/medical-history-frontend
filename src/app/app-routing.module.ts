import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ProceduresComponent } from './components/procedures/procedures.component';

const routes: Routes = [
  { path: 'pacientes', component: PatientsComponent},
  { path: 'doctores', component: DoctorsComponent},
  { path: 'procedimientos', component: ProceduresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
