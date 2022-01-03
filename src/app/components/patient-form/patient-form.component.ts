import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
  }

  patientForm = new FormGroup({
    patientId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]),
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')]),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]),
    gender: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z]*')])
  });

  maxDate = new Date();

  genderList = ['Femenino', 'Masculino'];

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