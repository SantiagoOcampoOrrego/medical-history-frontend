import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MedicalHistory } from 'src/app/models/medical-history';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';

@Component({
  selector: 'app-show-history',
  templateUrl: './show-history.component.html',
  styleUrls: ['./show-history.component.css']
})
export class ShowHistoryComponent implements OnInit {

  @Input() history!: any;

  historyForm = new FormGroup({
    currentMedication: new FormControl(''),
    doExercise: new FormControl(false, Validators.required),
    alcoholConsumption: new FormControl(false, Validators.required),
    smoker: new FormControl(false, Validators.required),
    weight: new FormControl(0.10, [Validators.required, Validators.min(0.10), Validators.max(300)]),
    height: new FormControl(0.30, [Validators.required, Validators.min(0.30), Validators.max(2.70)]),
    additionalComment: new FormControl('')
  });

  display: boolean = false;

  real: boolean = true;
  unreal: boolean = false;

  constructor(private historyService: MedicalHistoryService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public loadData(){
    this.historyForm.patchValue({
      'currentMedication': this.history.currentMedication,
      'doExercise': this.history.doExercise,
      'alcoholConsumption': this.history.alcoholConsumption,
      'smoker': this.history.smoker,
      'weight': this.history.weight,
      'height': this.history.height,
      'additionalComment': this.history.additionalComment
    });
  }

  public editHistory(){
    let history: MedicalHistory = {
      historyId: this.history.historyId,
      currentMedication : this.historyForm.get('currentMedication')?.value,
      doExercise : this.historyForm.get('doExercise')?.value,
      alcoholConsumption : this.historyForm.get('alcoholConsumption')?.value,
      smoker : this.historyForm.get('smoker')?.value,
      weight : this.historyForm.get('weight')?.value,
      height : this.historyForm.get('height')?.value,
      additionalComment : this.historyForm.get('additionalComment')?.value,
      patientId: this.history.patientId
    };

    this.historyService.updateMedicalHistory(history).subscribe(res => {
      if(res){
        this.history = history;
        this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'Los habitos se han actualizado correctamente.'});
      }
      else{
        this.messageService.add({key: 'main', severity:'error', summary: '¡Operación fallida!', detail: 'No fue posible actualizar. Vuelve a intentarlo más tarde.'});
      }
      this.display = false;
    });
  }

}
