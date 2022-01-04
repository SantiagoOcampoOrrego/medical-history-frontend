import { formatDate } from '@angular/common';
import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { EventEmitter } from '@angular/core';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  maxDate = new Date();

  genderList = ['Femenino', 'Masculino'];

  @Input() isEdit: boolean = false;
  @Input() patientId: number | undefined;
  @Output() sendBoolean: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendPatient: EventEmitter<Patient> = new EventEmitter<Patient>();

  patientForm = new FormGroup({
    patientId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]),
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')]),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]),
    gender: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z]*')])
  });

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.isEdit) this.getInformation();
  }

  public getInformation(){
    this.patientService.getPatient(this.patientId!).subscribe(patient => {
      this.patientForm.patchValue({
        'patientId' : patient.patientId,
        'firstName' : patient.firstName,
        'lastName' : patient.lastName,
        'birthDate' : new Date(formatDate(patient.birthDate, 'MM-dd-yyyy', 'en' , '+0000')),
        'address' : patient.address,
        'phoneNumber' : patient.phoneNumber,
        'gender' : patient.gender
      });
    })
  }

  public updatePatient(){
    if(this.patientForm.invalid){
      console.log('HAY ERRORES');
    }
    else{
      let patient = {
        patientId: this.patientForm.get('patientId')?.value,
        firstName: this.patientForm.get('firstName')?.value,
        lastName: this.patientForm.get('lastName')?.value,
        birthDate: this.patientForm.get('birthDate')?.value,
        address: this.patientForm.get('address')?.value,
        phoneNumber: this.patientForm.get('phoneNumber')?.value,
        gender: this.patientForm.get('gender')?.value
      }

      this.patientService.updatePatient(patient).subscribe();

      this.sendPatient.emit(patient);

      this.sendBoolean.emit(false);
    }
  }

  public savePatient(){
    if(this.patientForm.invalid){
      console.log('HAY ERRORES');
    }
    else{
      let patient = {
        patientId: this.patientForm.get('patientId')?.value,
        firstName: this.patientForm.get('firstName')?.value,
        lastName: this.patientForm.get('lastName')?.value,
        birthDate: this.patientForm.get('birthDate')?.value,
        address: this.patientForm.get('address')?.value,
        phoneNumber: this.patientForm.get('phoneNumber')?.value,
        gender: this.patientForm.get('gender')?.value
      }

      this.patientService.sendPatient(patient).subscribe(res => {
        console.log(res);
      })

      this.patientForm.reset();
    }
  }

}