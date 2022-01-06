import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: any;

  doctorForm = new FormGroup({
    doctorId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5,14}$')]),
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]),
    specialty: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')])
  });

  display: boolean = false;

  doctorToEdit: any;

  constructor(private doctorService: DoctorService, private messageService: MessageService, private confirmationService: ConfirmationService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Doctores');

    this.doctorService.getAllDoctors().subscribe(res => {
      if(res) this.doctors = res;
    });
  }

  public getEventValue($event:any) : string {
    return $event.target.value;
  }

  public loadData(){
    this.doctorForm.patchValue({
      'doctorId': this.doctorToEdit.doctorId,
      'firstName': this.doctorToEdit.firstName,
      'lastName': this.doctorToEdit.lastName,
      'address': this.doctorToEdit.address,
      'phoneNumber': this.doctorToEdit.phoneNumber,
      'specialty': this.doctorToEdit.specialty
    });
  }

  public addDoctor(){
    let doctor: Doctor = {
      doctorId: this.doctorForm.get('doctorId')?.value,
      firstName: this.doctorForm.get('firstName')?.value,
      lastName: this.doctorForm.get('lastName')?.value,
      address: this.doctorForm.get('address')?.value,
      phoneNumber: this.doctorForm.get('phoneNumber')?.value,
      specialty: this.doctorForm.get('specialty')?.value
    };

    this.doctorService.getDoctor(doctor.doctorId!).subscribe(res => {
      if(res.doctorId){
        this.messageService.add({key: 'main', severity:'error', summary: '¡Operación fallida!', detail: 'El número de documento ya se encuentra registrado.'});
      }
      else{
        this.doctorService.sendDoctor(doctor).subscribe(res => {
          this.doctors.unshift(res);
          this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'El doctor ha sido agregado correctamente.'});
          this.doctorForm.reset();
          this.display = false;
        });
      }
    });

  }

  public editDoctor(){
    this.doctorToEdit.firstName = this.doctorForm.get('firstName')?.value;
    this.doctorToEdit.lastName = this.doctorForm.get('lastName')?.value;
    this.doctorToEdit.address = this.doctorForm.get('address')?.value;
    this.doctorToEdit.phoneNumber = this.doctorForm.get('phoneNumber')?.value;
    this.doctorToEdit.specialty = this.doctorForm.get('specialty')?.value;
    this.doctorService.updateDoctor(this.doctorToEdit).subscribe(res => {
      if(res){
        this.doctors[this.doctors.findIndex((element: any) => element.doctorId == this.doctorToEdit.doctorId)] = this.doctorToEdit;
        this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'El doctor ha sido actualizado correctamente.'});
      }
      else{
        this.messageService.add({key: 'main', severity:'error', summary: '¡Operación fallida!', detail: 'El doctor no pudo ser actualizado. Vuelve a intentarlo más tarde.'});
      }
      this.display = false;
      this.doctorToEdit = undefined;
      this.doctorForm.reset();
    });
  }

  public deleteDoctor(doctor: any){
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar al doctor ' + doctor.firstName + ' ' + doctor.lastName + ' ?',
      header: 'Confirmación',
      key: 'doctor',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-info',
      accept: () => {
        this.doctorService.deleteDoctor(doctor.doctorId).subscribe(res => {
          if(res){
            this.doctors = this.doctors.filter((val: any) => val.doctorId !== doctor.doctorId);
            this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'El doctor fue eliminado correctamente.'});
          }
          else{
            this.messageService.add({key: 'main', severity:'error', summary: '¡Operación fallida!', detail: 'El doctor no pudo ser eliminado. Vuelve a intentarlo más tarde.'});
          }
        })
      },
      reject: () => {
        this.messageService.add({key: 'main', severity:'error', summary: '¡Operación cancelada!', detail: 'La operación fue cancelada.'})
      }
    });
  }

}
