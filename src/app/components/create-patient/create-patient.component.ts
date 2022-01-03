import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  items: MenuItem[] = [
    {label: 'Informacion personal'},
    {label: 'Historia clinica'},
    {label: 'Procedimientos'}
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

}
