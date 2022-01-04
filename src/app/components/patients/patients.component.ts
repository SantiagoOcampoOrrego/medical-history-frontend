import { Component, OnInit, Output } from '@angular/core';
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

  patients: Array<Patient> = new Array<Patient>();

  display: boolean = false;

  patientId: number | undefined;

  constructor(private patientService: PatientService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data;
    })
  }

  public receiveMessage(message: boolean){
    this.display = message;
  }

  public receivePatient(patient: Patient){
    this.patients[this.patients.findIndex(element => element.patientId == patient.patientId)] = patient;
  }

  public getEventValue($event:any) : string {
    return $event.target.value;
  }

  public editPatient(patient: Patient){
    this.display = true;
    this.patientId = patient.patientId!;
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
            this.messageService.add({severity:'success', summary: '¡Operación satisfactoria!', detail: 'El paciente ha sido eliminado correctamente.'});
        })
      },
      reject: () => {
        this.messageService.add({severity:'error', summary: '¡Operación cancelada!', detail: 'La operación fue cancelada.'})
      }
    }); 
  }

}