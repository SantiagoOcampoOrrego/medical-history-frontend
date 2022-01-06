import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-show-patient',
  templateUrl: './show-patient.component.html',
  styleUrls: ['./show-patient.component.css']
})
export class ShowPatientComponent implements OnInit {

  @Input() patient!: any;

  constructor(private patientService: PatientService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
