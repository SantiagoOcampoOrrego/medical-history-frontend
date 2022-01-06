import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DrugAllergy } from 'src/app/models/drug-allergy';
import { DrugAllergyService } from 'src/app/services/drug-allergy.service';

@Component({
  selector: 'app-show-allergies',
  templateUrl: './show-allergies.component.html',
  styleUrls: ['./show-allergies.component.css']
})
export class ShowAllergiesComponent implements OnInit {

  @Input() allergies: any;

  @Input() historyId!: number;

  allergyName = new FormControl('', Validators.required);

  display: boolean = false;

  allergyToEdit: any;

  constructor(private allergyService: DrugAllergyService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  public getEventValue($event:any) : string {
    return $event.target.value;
  }

  public addAllergy(){
    let allergy: DrugAllergy = {
      drugAllergyId: 0,
      drugName : this.allergyName.value,
      historyId : this.historyId
    };

    this.allergyService.sendDrugAllergy(allergy).subscribe(res => {
      this.allergies.unshift(res);
      this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'La alergia ha sido agregada correctamente.'});
      this.allergyName.reset();
      this.display = false;
    });

  }

  public editAllergy(){
    this.allergyToEdit.drugName = this.allergyName.value;
    this.allergyService.updateDrugAllergy(this.allergyToEdit).subscribe(res => {
      if(res){
        this.allergies[this.allergies.findIndex((element: any) => element.drugAllergyId == this.allergyToEdit.drugAllergyId)] = this.allergyToEdit;
        this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'La alergia ha sido actualizada correctamente.'});
      }
      else{
        this.messageService.add({key: 'main', severity:'error', summary: '¡Operación fallida!', detail: 'La alergia no pudo ser actualizada. Vuelve a intentarlo más tarde.'});
      }
      this.display = false;
      this.allergyToEdit = undefined;
      this.allergyName.reset();
    });
  }

  public deleteAllergy(allergy: any){
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar esta alergia?',
      header: 'Confirmación',
      key: 'allergy',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-info',
      accept: () => {
        this.allergyService.deleteDrugAllergy(allergy.drugAllergyId).subscribe(res => {
          if(res){
            this.allergies = this.allergies.filter((val: any) => val.drugAllergyId !== allergy.drugAllergyId);
            this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'La alergia ha sido eliminada correctamente.'});
          }
          else{
            this.messageService.add({key: 'main', severity:'error', summary: '¡Operación fallida!', detail: 'La alergia no pudo ser eliminada. Vuelve a intentarlo más tarde.'});
          }
        })
      },
      reject: () => {
        this.messageService.add({key: 'main', severity:'error', summary: '¡Operación cancelada!', detail: 'La operación fue cancelada.'})
      }
    });
  }

}
