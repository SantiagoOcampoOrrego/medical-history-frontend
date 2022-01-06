import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DrugAllergy } from '../models/drug-allergy';

@Injectable({
  providedIn: 'root'
})
export class DrugAllergyService {

  constructor(private http: HttpClient) { }

  public getDrugAllergy(drugAllergyId: number){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/medicamento-alergia?id="+drugAllergyId);
  }

  public sendDrugAllergy(drugAllergy: DrugAllergy){
    return this.http.post<any>(environment.protocol + environment.apiUrl + "/medicamento-alergia", drugAllergy)
  }

  public updateDrugAllergy(drugAllergy: DrugAllergy){
    return this.http.put<any>(environment.protocol + environment.apiUrl + "/medicamento-alergia", drugAllergy);
  }

  public deleteDrugAllergy(drugAllergyId: number){
    return this.http.delete<any>(environment.protocol + environment.apiUrl + "/medicamento-alergia?id="+drugAllergyId);
  }

  public getAllDrugAllergies(){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/medicamento-alergia/todos");
  }

  public getAllDrugAllergiesByHistoryId(historyId: number){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/medicamento-alergia/historia?id=" + historyId);
  }

}
