import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DoctorService } from 'src/app/services/doctor.service';
import { StepsService } from 'src/app/services/steps.service';

@Component({
  selector: 'app-select-doctor',
  templateUrl: './select-doctor.component.html',
  styleUrls: ['./select-doctor.component.css']
})
export class SelectDoctorComponent implements OnInit {

  doctors: any;

  selectedDoctor: any | undefined;

  constructor(private doctorService: DoctorService, private stepService: StepsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe(res => {
      if(res) this.doctors = res;
    });
  }

  public saveDoctor(){
    if(this.selectedDoctor){
      this.stepService.doctor = this.selectedDoctor;
      this.stepService.nextIndex();
    }
    else{
      this.messageService.add({severity:'error', summary: '¡Operación fallida!', detail: 'Debes seleccionar un doctor.'});
    }
  }

}
