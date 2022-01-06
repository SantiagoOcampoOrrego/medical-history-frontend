import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { DrugAllergy } from 'src/app/models/drug-allergy';
import { FamiliarDisease } from 'src/app/models/familiar-disease';
import { MedicalHistory } from 'src/app/models/medical-history';
import { Patient } from 'src/app/models/patient';
import { Procedure } from 'src/app/models/procedure';
import { DrugAllergyService } from 'src/app/services/drug-allergy.service';
import { FamiliarDiseaseService } from 'src/app/services/familiar-disease.service';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';
import { PatientService } from 'src/app/services/patient.service';
import { ProcedureService } from 'src/app/services/procedure.service';
import { StepsService } from 'src/app/services/steps.service';

export enum PagesNames{
  DoctorPage,
  PatientPage,
  HistoryPage,
  AllergyPage,
  FamiliarDiseasePage,
  ProcedurePage
}

@Component({
  selector: 'app-steps-form',
  templateUrl: './steps-form.component.html',
  styleUrls: ['./steps-form.component.css']
})
export class StepsFormComponent implements OnInit {

  PageNames = PagesNames;

  dialogPageIndex : number = this.PageNames.DoctorPage;

  dialogPages: MenuItem[] = [
    { label: 'Doctor' },
    { label: 'Información del paciente' },
    { label: 'Historia clínica' },
    { label: 'Alergias' },
    { label: 'Enfermedades familiares' },
    { label: 'Procedimientos' }
  ];

  patientForm: FormGroup | undefined;

  historyForm: FormGroup | undefined;

  @Output() final: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() patient: EventEmitter<any> = new EventEmitter<any>();

  constructor(private stepService: StepsService,
              private patientService: PatientService,
              private historyService: MedicalHistoryService,
              private allergyService: DrugAllergyService,
              private diseaseService: FamiliarDiseaseService,
              private messageService: MessageService,
              private procedureService: ProcedureService) { }

  ngOnInit(): void {
    this.stepService.next.subscribe(index => {
      this.dialogPageIndex = index;
    })
  }

  saveHistory(){
    let patient: Patient = {
      patientId: this.stepService.patientForm?.get('patientId')?.value,
      firstName: this.stepService.patientForm?.get('firstName')?.value,
      lastName: this.stepService.patientForm?.get('lastName')?.value,
      birthDate: this.stepService.patientForm?.get('birthDate')?.value,
      address: this.stepService.patientForm?.get('address')?.value,
      phoneNumber: this.stepService.patientForm?.get('phoneNumber')?.value,
      gender: this.stepService.patientForm?.get('gender')?.value
    };

    let history: MedicalHistory = {
      historyId: 0,
      patientId: this.stepService.patientForm?.get('patientId')?.value,
      currentMedication: this.stepService.historyForm?.get('currentMedication')?.value,
      doExercise: this.stepService.historyForm?.get('doExercise')?.value,
      alcoholConsumption: this.stepService.historyForm?.get('alcoholConsumption')?.value,
      smoker: this.stepService.historyForm?.get('smoker')?.value,
      weight: this.stepService.historyForm?.get('weight')?.value,
      height: this.stepService.historyForm?.get('height')?.value,
      additionalComment: this.stepService.historyForm?.get('additionalComment')?.value
    };

    this.stepService.patientForm?.reset();
    this.stepService.historyForm?.reset();

    this.patientService.sendPatient(patient).subscribe(patientDTO => {
      this.patient.emit(patientDTO);

      this.historyService.sendMedicalHistory(history).subscribe(historyDTO => {
        
        this.stepService.allergies.forEach(name => {
          let allergy: DrugAllergy = {
            drugAllergyId: 0,
            drugName: name,
            historyId: historyDTO.historyId
          };

          this.allergyService.sendDrugAllergy(allergy).subscribe();

          this.stepService.allergies = [];
        });

        this.stepService.checkedAllergy = false;

        this.stepService.familiarDiseases.forEach(disease => {
          let familiarDisease: FamiliarDisease = {
            familiarDiseaseId: 0,
            diseaseName: disease.diseaseName,
            relationship: disease.relationship,
            historyId: historyDTO.historyId
          };

          this.diseaseService.sendFamiliarDisease(familiarDisease).subscribe();
  
          this.stepService.familiarDiseases = [];
        });

        this.stepService.checkedDiseases = false;

        if(this.stepService.procedures.length == 0) this.stepService.doctor = undefined;

        this.stepService.procedures.forEach(item => {
          let procedure: Procedure = {
            procedureId: 0,
            procedureTypeId: item.procedureTypeId,
            doctorId: this.stepService.doctor[0],
            historyId: historyDTO.historyId,
            procedureDate: item.procedureDate,
            diagnosis: item.diagnosis,
            treatment: item.treatment
          };

          this.procedureService.sendProcedure(procedure).subscribe();

          this.stepService.checkedProcedure = false;
          this.stepService.doctor = undefined;
        });

      });
    });

    this.final.emit(true);

  };

}
