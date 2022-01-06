import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  patientForm: FormGroup | undefined;
  historyForm: FormGroup | undefined;
  allergies: Array<string> = new Array<string>();
  checkedAllergy: boolean = false;
  familiarDiseases: Array<any> = new Array<any>();
  checkedDiseases: boolean = false;
  procedures: Array<any> = new Array<any>();
  checkedProcedure: boolean = false;
  next: EventEmitter<number> = new EventEmitter<number>();
  index: number = 0;
  doctor: any;

  constructor() { }

  public nextIndex(){
    this.index += 1;
    this.next.emit(this.index);
  }

  public previousIndex(){
    this.index -= 1;
    this.next.emit(this.index);
  }

}
