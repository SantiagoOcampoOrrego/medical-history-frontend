import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public identificacion: number | undefined ;

  constructor(private patientService: PatientService) { 
    
  }

  ngOnInit(): void {
  }

}
