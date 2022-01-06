import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { HistoryTabComponent } from './components/history-tab/history-tab.component';
import { PatientsComponent } from './components/patients/patients.component';
import { StepsFormComponent } from './components/steps-form/steps-form.component';

const routes: Routes = [
  { path: 'pacientes', component: PatientsComponent},
  { path: 'doctores', component: DoctorsComponent},
  { path: 'historia/:patientId', component: HistoryTabComponent},
  { path: 'steps', component: StepsFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
