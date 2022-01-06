import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DrugAllergyService } from 'src/app/services/drug-allergy.service';
import { FamiliarDiseaseService } from 'src/app/services/familiar-disease.service';
import { MedicalHistoryService } from 'src/app/services/medical-history.service';
import { PatientService } from 'src/app/services/patient.service';
import { ProcedureService } from 'src/app/services/procedure.service';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.css']
})
export class HistoryTabComponent implements OnInit {

  patientId!: number;

  patient!: any;

  history!: any;

  historyId!: number;

  drugAllergies!: any;

  diseases!: any;

  procedures: any;

  isLoaded: boolean = false;

  constructor(private patientService: PatientService, 
              private historyService: MedicalHistoryService, 
              private drugAllergyService: DrugAllergyService,
              private diseaseService: FamiliarDiseaseService,
              private procedureService: ProcedureService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['patientId'];
    this.patientService.getPatient(this.patientId).subscribe(res => {
      this.patient = res;
      this.isLoaded = true;
      this.historyService.getHistoryByPatientId(this.patientId).subscribe(history => {
        this.history = history;
        this.historyId = history.historyId;
        this.diseaseService.getAllFamiliarDiseasesByHistoryId(this.history.historyId).subscribe(diseases => {
          this.diseases = diseases;
        });
        this.drugAllergyService.getAllDrugAllergiesByHistoryId(this.history.historyId).subscribe(allergies => {
          this.drugAllergies = allergies;
        });
        this.procedureService.getAllProceduresByHistoryId(this.history.historyId).subscribe(procedures => {
          this.procedures = procedures;
        });
      });
    });
  }

}
