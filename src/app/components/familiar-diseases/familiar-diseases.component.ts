import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FamiliarDisease } from 'src/app/models/familiar-disease';
import { StepsService } from 'src/app/services/steps.service';

@Component({
  selector: 'app-familiar-diseases',
  templateUrl: './familiar-diseases.component.html',
  styleUrls: ['./familiar-diseases.component.css']
})
export class FamiliarDiseasesComponent implements OnInit {

  familiarForm = new FormGroup({
    'diseaseName': new FormControl('', Validators.required),
    'relationship': new FormControl('Padre', Validators.required)
  });

  diseases: Array<any> = new Array<any>();

  display: boolean = false;

  checked: boolean = false;

  relationshipList: Array<String> = [
    'Padre', 
    'Madre', 
    'Abuelo/a paterno', 
    'Abuelo/a materno',
    'Hermano/a'
  ];

  constructor(private stepService: StepsService) { }

  ngOnInit(): void {
    if(this.stepService.familiarDiseases.length){
      this.diseases = this.stepService.familiarDiseases;
      this.checked = this.stepService.checkedDiseases;
    }
  }

  public getEventValue($event:any) : string {
    return $event.target.value;
  }

  public prevPage(){
    this.stepService.previousIndex();
  }

  addDiseaseMemory(){
    let familiarDisease = {
      'diseaseName': this.familiarForm.get('diseaseName')?.value,
      'relationship': this.familiarForm.get('relationship')?.value
    };
    this.diseases.unshift(familiarDisease);
    this.display = false;
    this.familiarForm.reset();
  }

  saveDiseaseMemory(){
    if(this.diseases.length && this.checked){
      this.stepService.familiarDiseases = this.diseases;
      this.stepService.checkedDiseases = this.checked;
    }

    this.stepService.nextIndex();
  }

  deleteDiseaseMemory(familiarDisease: FormGroup){
    this.diseases.forEach((value,index)=>{
      if(value === familiarDisease) this.diseases.splice(index,1);
    });
  }

}
