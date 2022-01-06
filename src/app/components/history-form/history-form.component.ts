import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepsService } from 'src/app/services/steps.service';

@Component({
  selector: 'app-history-form',
  templateUrl: './history-form.component.html',
  styleUrls: ['./history-form.component.css']
})
export class HistoryFormComponent implements OnInit {

  historyForm = new FormGroup({
    currentMedication: new FormControl(''),
    doExercise: new FormControl(false, Validators.required),
    alcoholConsumption: new FormControl(false, Validators.required),
    smoker: new FormControl(false, Validators.required),
    weight: new FormControl(0.10, [Validators.required, Validators.min(0.10), Validators.max(300)]),
    height: new FormControl(0.30, [Validators.required, Validators.min(0.30), Validators.max(2.70)]),
    additionalComment: new FormControl('')
  });

  constructor(private stepService: StepsService) { }

  ngOnInit(): void {
    if(this.stepService.historyForm !== undefined){
      this.historyForm = this.stepService.historyForm;
    }
  }

  public saveHistory(){
    this.stepService.historyForm = this.historyForm;
    this.stepService.nextIndex();
  }

  public prevPage(){
    this.stepService.previousIndex();
  }

}