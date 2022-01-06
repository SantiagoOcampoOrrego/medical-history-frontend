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

  displayAdd: boolean = false;

  displayEdit: boolean = false;

  patient: Patient | undefined;

  constructor(private patientService: PatientService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe(data => {
      this.patients = data;
    })
  }

  public receiveMessage(message: boolean){
    this.displayEdit = message;
  }

  public closeDialog(){
    this.displayAdd = false;
    this.messageService.add({severity:'success', summary: '¡Operación satisfactoria!', detail: 'El paciente fue creado correctamente.'});
  }

  public addPatient(patient: any){
    this.patients.unshift(patient);
  }

  public editPatient(patient: Patient){
    this.patientService.updatePatient(patient).subscribe(res => {
      if(res){
        this.patients[this.patients.findIndex(element => element.patientId == patient.patientId)] = patient;
      }
      else{
        this.messageService.add({severity:'error', summary: '¡Operación fallida!', detail: 'El paciente no pudo ser actualizado. Vuelve a intentarlo más tarde.'});
      }
    })
  }

  public getEventValue($event:any) : string {
    return $event.target.value;
  }

  public getPatient(patient: Patient){
    this.patientService.getPatient(patient.patientId!).subscribe(res => {
      if(res){
        this.patient = res;
        this.displayEdit = true;
      }
      else{
        this.messageService.add({severity:'error', summary: '¡Operación fallida!', detail: 'No se pudo cargar el paciente. Recarga la página y vuelve a intentarlo.'});
      }
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
          if(res){
            this.patients = this.patients.filter(val => val.patientId !== patient.patientId); 
            this.messageService.add({severity:'success', summary: '¡Operación satisfactoria!', detail: 'El paciente ha sido eliminado correctamente.'});
          }
          else{
            this.messageService.add({severity:'error', summary: '¡Operación fallida!', detail: 'El paciente no pudo ser eliminado. Vuelve a intentarlo más tarde.'});
          }
        })
      },
      reject: () => {
        this.messageService.add({severity:'error', summary: '¡Operación cancelada!', detail: 'La operación fue cancelada.'})
      }
    }); 
  }

}