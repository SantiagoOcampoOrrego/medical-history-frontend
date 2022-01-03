import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: MenuItem[];
  selectedItem: MenuItem;

  constructor() { 
    this.items = [
      {
          label:'Pacientes',
          icon:'pi pi-fw pi-users',
          routerLink: "pacientes"
      },
      {
          label:'Procedimientos',
          icon:'pi pi-fw pi-check-square',
      },
      {
          label:'Doctores',
          icon:'pi pi-fw pi-briefcase',
      },
      {
          label:'Salir',
          icon:'pi pi-fw pi-power-off'
      }
    ];

    this.selectedItem = this.items[0];
  }

  ngOnInit(): void {
    
  }

}
