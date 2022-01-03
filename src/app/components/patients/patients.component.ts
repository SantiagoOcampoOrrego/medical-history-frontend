import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Patient } from 'src/app/models/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class PatientsComponent implements OnInit {

  constructor(private patientService: PatientService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  patients: Array<Patient> = new Array<Patient>();

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data;
    })
  }

  public deletePatient(patient: Patient){
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar al paciente ' + patient.firstName + ' ' + patient.lastName + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-info',
      accept: () => {
        this.patientService.deletePatient(patient.patientId).subscribe(res => {
            this.patients = this.patients.filter(val => val.patientId !== patient.patientId);
            this.messageService.add({severity:'success', summary: 'Operación satisfactoria', detail: 'Paciente eliminado', life: 3000});
        })
      }
    }); 
  }

}