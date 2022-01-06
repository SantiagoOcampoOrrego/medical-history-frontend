import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  selectedItem: MenuItem;

  constructor() { 
    this.items = [
      {
          label:'Pacientes',
          icon:'pi pi-fw pi-users',
          routerLink: "/pacientes"
      },
      {
          label:'Doctores',
          icon:'pi pi-fw pi-briefcase',
          routerLink: "/doctores"
      }
    ];

    this.selectedItem = this.items[0];
  }

  ngOnInit(): void {
  }

}
