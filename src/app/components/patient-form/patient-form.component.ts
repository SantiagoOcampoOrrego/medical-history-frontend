import { formatDate } from '@angular/common';
import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Patient } from 'src/app/models/patient';
import { StepsService } from 'src/app/services/steps.service';
import { MessageService } from 'primeng/api';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  maxDate = new Date();

  genderList = ['Femenino', 'Masculino'];

  @Input() isEdit: boolean = false;
  @Input() patient: Patient | undefined;
  @Output() sendBoolean: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendPatient: EventEmitter<Patient> = new EventEmitter<Patient>();

  patientForm = new FormGroup({
    patientId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5,14}$')]),
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')]),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]),
    gender: new FormControl(this.genderList[0], [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z]*')])
  });

  constructor(private stepService: StepsService, private messageService: MessageService, private patientService: PatientService) { }

  ngOnInit(): void {
    if(this.stepService.patientForm !== undefined){
      this.patientForm = this.stepService.patientForm;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isEdit) this.setInformation();
  }

  public setInformation(){
    if(this.patient){
      
      this.patientForm.patchValue({
        'patientId' : this.patient.patientId,
        'firstName' : this.patient.firstName,
        'lastName' : this.patient.lastName,
        'birthDate' : new Date(formatDate(this.patient.birthDate!, 'MM-dd-yyyy', 'en' , '+0000')),
        'address' : this.patient.address,
        'phoneNumber' : this.patient.phoneNumber,
        'gender' : this.patient.gender
      });

    }
  }

  public sendPatientData(){
    let patient = {
      patientId: this.patientForm.get('patientId')?.value,
      firstName: this.patientForm.get('firstName')?.value,
      lastName: this.patientForm.get('lastName')?.value,
      birthDate: this.patientForm.get('birthDate')?.value,
      address: this.patientForm.get('address')?.value,
      phoneNumber: this.patientForm.get('phoneNumber')?.value,
      gender: this.patientForm.get('gender')?.value
    }

    this.sendPatient.emit(patient);
    this.sendBoolean.emit(false);
  }

  public savePatient(){
    this.patientService.getPatient(this.patientForm.get('patientId')?.value).subscribe(res => {
      if(res.patientId){
        this.messageService.add({severity:'error', summary: '¡Operación fallida!', detail: 'El número de documento ya se encuentra registrado.'});
      }
      else{
        this.stepService.patientForm = this.patientForm;
        this.stepService.nextIndex();
      }
    });
  }

  public prevPage(){
    this.stepService.previousIndex();
  }

}