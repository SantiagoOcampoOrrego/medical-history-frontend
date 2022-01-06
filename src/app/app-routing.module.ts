import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { HistoryTabComponent } from './components/history-tab/history-tab.component';
import { PatientsComponent } from './components/patients/patients.component';

const routes: Routes = [
  { path: 'pacientes', component: PatientsComponent},
  { path: 'doctores', component: DoctorsComponent},
  { path: 'historia/:patientId', component: HistoryTabComponent},
  {path: '**', redirectTo: '/pacientes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
