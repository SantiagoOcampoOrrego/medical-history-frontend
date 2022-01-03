import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrls: ['./history-form.component.css']
})
export class HistoryFormComponent implements OnInit {

  constructor(private historyService: MedicalHistoryService) { }

  ngOnInit(): void {
  }

  historyForm = new FormGroup({
    patientId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]),
    currentMedication: new FormControl('', Validators.pattern('^[A-Za-z][A-Za-z ]*')),
    doExercise: new FormControl(false, Validators.required),
    alcoholConsumption: new FormControl(false, Validators.required),
    smoker: new FormControl(false, Validators.required),
    weight: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    additionalComment: new FormControl('')
  });

  doExercise: boolean = false;
  alcoholConsumption: boolean = false;
  smoker: boolean = false;

  public saveHistory(){
    if(this.historyForm.invalid){
      console.log('HAY ERRORES');
    }
    else{
      let history = {
        historyId: 0,
        patientId: this.historyForm.get('patientId')?.value,
        currentMedication: this.historyForm.get('currentMedication')?.value,
        doExercise: this.historyForm.get('doExercise')?.value,
        alcoholConsumption: this.historyForm.get('alcoholConsumption')?.value,
        smoker: this.historyForm.get('smoker')?.value,
        weight: this.historyForm.get('weight')?.value,
        height: this.historyForm.get('height')?.value,
        additionalComment: this.historyForm.get('additionalComment')?.value
      };

      this.historyService.sendMedicalHistory(history).subscribe(res => {
        console.log(res);
      })
    }
  }

  public mostrar(){
    let history = {
      historyId: 0,
      patientId: this.historyForm.get('patientId')?.value,
      currentMedication: this.historyForm.get('currentMedication')?.value,
      doExercise: this.historyForm.get('doExercise')?.value,
      alcoholConsumption: this.historyForm.get('alcoholConsumption')?.value,
      smoker: this.historyForm.get('smoker')?.value,
      weight: this.historyForm.get('weight')?.value,
      height: this.historyForm.get('height')?.value,
      additionalComment: this.historyForm.get('additionalComment')?.value
    };

    if(!this.historyForm.invalid){console.log(history);}
  }

}

/*export class MedicalHistory {
  public historyId: number | undefined;
  public patientId: number | undefined;
  public currentMedication: string | undefined;
  public doExercise: boolean | undefined;
  public alcoholConsumption: boolean | undefined;
  public smoker: boolean | undefined;
  public weight: number | undefined;
  public height: number | undefined;
  public additionalComment: string | undefined;
}*/