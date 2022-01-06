import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Procedure } from 'src/app/models/procedure';
import { DoctorService } from 'src/app/services/doctor.service';
import { ProcedureTypeService } from 'src/app/services/procedure-type.service';
import { ProcedureService } from 'src/app/services/procedure.service';

@Component({
  selector: 'app-show-procedure',
  templateUrl: './show-procedure.component.html',
  styleUrls: ['./show-procedure.component.css']
})
export class ShowProcedureComponent implements OnInit {

  @Input() procedures: any;

  @Input() historyId!: number;

  maxDate = new Date();

  doctors: any;

  procedureForm = new FormGroup({
    'procedureTypeId': new FormControl('', Validators.required),
    'procedureDate': new FormControl('', Validators.required),
    'diagnosis': new FormControl('', Validators.required),
    'treatment': new FormControl('', Validators.required),
    'selectedDoctor': new FormControl('', Validators.required)
  });

  display: boolean = false;

  procedureToEdit: any;

  procedureTypes: any[] | undefined;

  proceduresNames: Map<number, string> = new Map<number, string>();

  constructor(private procedureService: ProcedureService, 
              private procedureTypeService: ProcedureTypeService , 
              private messageService: MessageService,
              private doctorService: DoctorService, 
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.procedureTypeService.getAllProcedureTypes().subscribe(res => {
      this.procedureTypes = res;
      this.procedureTypes?.forEach(procedure => {
        this.proceduresNames.set(procedure.typeId, procedure.typeName);
      });
    });

    this.doctorService.getAllDoctors().subscribe(res => {
      if(res) this.doctors = res;
    });
  }

  public getEventValue($event:any) : string {
    return $event.target.value;
  }

  public loadData(){
    this.procedureForm.patchValue({
      'procedureTypeId' : this.procedureToEdit.procedureTypeId,
      'diagnosis' : this.procedureToEdit.diagnosis,
      'treatment' : this.procedureToEdit.treatment,
      'selectedDoctor': this.procedureToEdit.doctorId
    });
  }

  public addProcedure(){
    let procedure: Procedure = {
      procedureId: 0,
      doctorId: this.procedureForm.get('selectedDoctor')?.value[0],
      historyId: this.historyId,
      procedureTypeId: this.procedureForm.get('procedureTypeId')?.value,
      procedureDate: this.procedureForm.get('procedureDate')?.value,
      diagnosis: this.procedureForm.get('diagnosis')?.value,
      treatment: this.procedureForm.get('treatment')?.value
    };

    this.procedureService.sendProcedure(procedure).subscribe(res => {
      this.procedures.unshift(res);
      this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'El procedimiento ha sido agregado correctamente.'});
      this.procedureForm.reset();
      this.display = false;
    });

  }

  public editProcedure(){
    this.procedureToEdit.procedureTypeId = this.procedureForm.get('procedureTypeId')?.value;
    this.procedureToEdit.procedureDate = this.procedureForm.get('procedureDate')?.value;
    this.procedureToEdit.diagnosis = this.procedureForm.get('diagnosis')?.value;
    this.procedureToEdit.treatment = this.procedureForm.get('treatment')?.value;
    this.procedureToEdit.doctorId = this.procedureForm.get('selectedDoctor')?.value[0];
    this.procedureService.updateProcedure(this.procedureToEdit).subscribe(res => {
      if(res){
        this.procedures[this.procedures.findIndex((element: any) => element.procedureId == this.procedureToEdit.procedureId)] = this.procedureToEdit;
        this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'El procedimiento ha sido actualizado correctamente.'});
      }
      else{
        this.messageService.add({key: 'main', severity:'error', summary: '¡Operación fallida!', detail: 'El procedimiento no pudo ser actualizado. Vuelve a intentarlo más tarde.'});
      }
      this.display = false;
      this.procedureToEdit = undefined;
      this.procedureForm.reset();
    });
  }

  public deleteProcedure(procedure: any){
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este procedimiento?',
      header: 'Confirmación',
      key: 'procedure',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Cancelar',
      rejectButtonStyleClass: 'p-button-info',
      accept: () => {
        this.procedureService.deleteProcedure(procedure.procedureId).subscribe(res => {
          if(res){
            this.procedures = this.procedures.filter((val: any) => val.procedureId !== procedure.procedureId);
            this.messageService.add({key: 'main', severity:'success', summary: '¡Operación satisfactoria!', detail: 'El procedimiento ha sido eliminado correctamente.'});
          }
          else{
            this.messageService.add({key: 'main', severity:'error', summary: '¡Operación fallida!', detail: 'El procedimiento no pudo ser eliminado. Vuelve a intentarlo más tarde.'});
          }
        })
      },
      reject: () => {
        this.messageService.add({key: 'main', severity:'error', summary: '¡Operación cancelada!', detail: 'La operación fue cancelada.'})
      }
    });
  }

}
