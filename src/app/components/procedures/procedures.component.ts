import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Procedure } from 'src/app/models/procedure';
import { ProcedureTypeService } from 'src/app/services/procedure-type.service';
import { StepsService } from 'src/app/services/steps.service';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {

  procedureForm = new FormGroup({
    'procedureTypeId': new FormControl('', Validators.required),
    'procedureDate': new FormControl('', Validators.required),
    'diagnosis': new FormControl('', Validators.required),
    'treatment': new FormControl('', Validators.required)
  });

  maxDate = new Date();

  procedures: Array<any> = new Array<any>();

  display: boolean = false;

  checked: boolean = false;

  procedureTypes: any[] | undefined;

  proceduresNames: Map<number, string> = new Map<number, string>();

  @Output() final: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private procedureTypeService: ProcedureTypeService , private stepService: StepsService) { }

  ngOnInit(): void {
    this.procedureTypeService.getAllProcedureTypes().subscribe(res => {
      this.procedureTypes = res;
      this.procedureTypes?.forEach(procedure => {
        this.proceduresNames.set(procedure.typeId, procedure.typeName);
      });
    });

    if(this.stepService.procedures.length){
      this.procedures = this.stepService.procedures;
      this.checked = this.stepService.checkedProcedure;
    }
  }

  public getEventValue($event:any) : string {
    return $event.target.value;
  }

  public prevPage(){
    this.stepService.previousIndex();
  }

  addProcedureMemory(){
    let procedure = {
      'procedureTypeId': this.procedureForm.get('procedureTypeId')?.value,
      'procedureDate': this.procedureForm.get('procedureDate')?.value,
      'diagnosis': this.procedureForm.get('diagnosis')?.value,
      'treatment': this.procedureForm.get('treatment')?.value
    };
    this.procedures.unshift(procedure);
    this.display = false;
    this.procedureForm.reset();
  }

  saveProcedureMemory(){
    if(this.procedures.length && this.checked){
      this.stepService.procedures = this.procedures;
      this.stepService.checkedProcedure = this.checked;
    }

    this.final.emit(true);
  }

  deleteProcedureMemory(familiarprocedure: FormGroup){
    this.procedures.forEach((value,index)=>{
      if(value === familiarprocedure) this.procedures.splice(index,1);
    });
  }

}
