import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    
  }

  doctorForm = new FormGroup({
    doctorId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]),
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]),
    specialty: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z ]*')])
  });

  public saveDoctor() {
    if(this.doctorForm.invalid){
      console.log('HAY ERRORES');
    }
    else{
      console.log(this.doctorForm);
      let doctor = {
        doctorId: this.doctorForm.get('doctorId')?.value,
        firstName: this.doctorForm.get('firstName')?.value,
        lastName: this.doctorForm.get('lastName')?.value,
        address: this.doctorForm.get('address')?.value,
        phoneNumber: this.doctorForm.get('phoneNumber')?.value,
        specialty: this.doctorForm.get('specialty')?.value
      }
      this.doctorService.sendDoctor(doctor).subscribe(res => {
        console.log(res);
      })
    }
  }

}
