import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StepsService } from 'src/app/services/steps.service';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrls: ['./allergies.component.css']
})
export class AllergiesComponent implements OnInit {

  allergyName = new FormControl('', Validators.required);

  allergies: Array<string> = new Array<string>();

  selectedAllergies: Array<string> = new Array<string>();

  display: boolean = false;

  checked: boolean = false;

  constructor(private stepService: StepsService) { }

  ngOnInit(): void {
    if(this.stepService.allergies.length){
      this.allergies = this.stepService.allergies;
      this.checked = this.stepService.checkedAllergy;
    }
  }

  public getEventValue($event:any) : string {
    return $event.target.value;
  }

  public prevPage(){
    this.stepService.previousIndex();
  }

  addAllergyMemory(){
    this.allergies.unshift(this.allergyName.value);
    this.display = false;
    this.allergyName.reset();
  }

  saveAllergyMemory(){
    if(this.allergies.length && this.checked){
      this.stepService.allergies = this.allergies;
      this.stepService.checkedAllergy = this.checked;
    }

    this.stepService.nextIndex();
  }

  deleteAllergyMemory(allergy: string){
    this.allergies.forEach((value,index)=>{
      if(value==allergy) this.allergies.splice(index,1);
    });
  }

}
