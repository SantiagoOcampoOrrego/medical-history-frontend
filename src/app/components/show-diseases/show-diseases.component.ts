import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FamiliarDisease } from 'src/app/models/familiar-disease';
import { FamiliarDiseaseService } from 'src/app/services/familiar-disease.service';

@Component({
  selector: 'app-show-diseases',
  templateUrl: './show-diseases.component.html',
  styleUrls: ['./show-diseases.component.css']
})
export class ShowDiseasesComponent implements OnInit {

  @Input() diseases: any;

  @Input() historyId!: number;

  familiarForm = new FormGroup({
    'diseaseName': new FormControl('', Validators.required),
    'relationship': new FormControl('Padre', Validators.required)
  });

  relationshipList: Array<String> = [
    'Padre', 
    'Madre', 
    'Abuelo/a paterno', 
    'Abuelo/a materno',
    'Hermano/a'
  ];

  display: boolean = false;

  diseaseToEdit: any;

  constructor(private diseaseService: FamiliarDiseaseService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  public getEventValue($event:any) : string {
    return $event.target.value;
  }

  public addDisease(){
    let disease: FamiliarDisease = {
      familiarDiseaseId: 0,
      diseaseName : this.familiarForm.get('diseaseName')?.value,
      relationship : this.familiarForm.get('relationship')?.value,
      historyId : this.historyId
    };

    this.diseaseService.sendFamiliarDisease(disease).subscribe(res => {
      this.diseases.unshift(res);
      this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'La enfermedad ha sido agregada correctamente.'});
      this.familiarForm.reset();
      this.display = false;
    });

  }

  public editDisease(){
    this.diseaseToEdit.diseaseName = this.familiarForm.get('diseaseName')?.value;
    this.diseaseToEdit.relationship = this.familiarForm.get('relationship')?.value;
    this.diseaseService.updateFamiliarDisease(this.diseaseToEdit).subscribe(res => {
      if(res){
        this.diseases[this.diseases.findIndex((element: any) => element.familiarDiseaseId == this.diseaseToEdit.familiarDiseaseId)] = this.diseaseToEdit;
        this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'La enfermedad ha sido actualizada correctamente.'});
      }
      else{
        this.messageService.add({key: 'main', severity:'error', summary: '¡Operación fallida!', detail: 'La enfermedad no pudo ser actualizada. Vuelve a intentarlo más tarde.'});
      }
      this.display = false;
      this.diseaseToEdit = undefined;
      this.familiarForm.reset();
    });
  }

  public deleteDisease(disease: any){
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar esta enfermedad familiar?',
      header: 'Confirmación',
      key: 'disease',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-info',
      accept: () => {
        this.diseaseService.deleteFamiliarDisease(disease.familiarDiseaseId).subscribe(res => {
          if(res){
            this.diseases = this.diseases.filter((val: any) => val.familiarDiseaseId !== disease.familiarDiseaseId);
            this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'La enfermedad ha sido eliminada correctamente.'});
          }
          else{
            this.messageService.add({key: 'main', severity:'error', summary: '¡Operación fallida!', detail: 'La enfermedad no pudo ser eliminada. Vuelve a intentarlo más tarde.'});
          }
        })
      },
      reject: () => {
        this.messageService.add({key: 'main', severity:'error', summary: '¡Operación cancelada!', detail: 'La operación fue cancelada.'})
      }
    });
  }
}
