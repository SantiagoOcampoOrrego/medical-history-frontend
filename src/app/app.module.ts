import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { AppRoutingModule } from './app-routing.module';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import {CardModule} from 'primeng/card';
import {TabMenuModule} from 'primeng/tabmenu';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { HistoryFormComponent } from './components/history-form/history-form.component';
import {CheckboxModule} from 'primeng/checkbox';
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {StepsModule} from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MenubarModule} from 'primeng/menubar';
import { PatientsComponent } from './components/patients/patients.component';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import { MenuComponent } from './components/menu/menu.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { StepsFormComponent } from './components/steps-form/steps-form.component';
import { AllergiesComponent } from './components/allergies/allergies.component';
import { FamiliarDiseasesComponent } from './components/familiar-diseases/familiar-diseases.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { HistoryTabComponent } from './components/history-tab/history-tab.component';
import { ShowPatientComponent } from './components/show-patient/show-patient.component';
import { ShowHistoryComponent } from './components/show-history/show-history.component';
import { ShowProcedureComponent } from './components/show-procedure/show-procedure.component';
import { ShowAllergiesComponent } from './components/show-allergies/show-allergies.component';
import { ShowDiseasesComponent } from './components/show-diseases/show-diseases.component';
import { SelectDoctorComponent } from './components/select-doctor/select-doctor.component';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [
    AppComponent,
    PatientFormComponent,
    DoctorFormComponent,
    HistoryFormComponent,
    PatientsComponent,
    MenuComponent,
    DoctorsComponent,
    ProceduresComponent,
    StepsFormComponent,
    AllergiesComponent,
    FamiliarDiseasesComponent,
    HistoryTabComponent,
    ShowPatientComponent,
    ShowHistoryComponent,
    ShowProcedureComponent,
    ShowAllergiesComponent,
    ShowDiseasesComponent,
    SelectDoctorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    AppRoutingModule,
    CardModule,
    TabMenuModule,
    PanelModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    FieldsetModule,
    InputTextareaModule,
    StepsModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    InputSwitchModule,
    MultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
