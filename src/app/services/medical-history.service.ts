import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MedicalHistory } from '../models/medical-history';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  constructor(private http: HttpClient) { }

  public getMedicalHistory(medicalHistoryId: number){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/historia-clinica?id="+medicalHistoryId);
  }

  public sendMedicalHistory(medicalHistory: MedicalHistory){
    return this.http.post<any>(environment.protocol + environment.apiUrl + "/historia-clinica", medicalHistory)
  }

  public updateMedicalHistory(medicalHistory: MedicalHistory){
    return this.http.put<any>(environment.protocol + environment.apiUrl + "/historia-clinica", medicalHistory);
  }

  public deleteMedicalHistory(medicalHistoryId: number){
    return this.http.delete<any>(environment.protocol + environment.apiUrl + "/historia-clinica?id="+medicalHistoryId);
  }

  public getHistoryByPatientId(patientId: number){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/historia-clinica/"+patientId);
  }

}
