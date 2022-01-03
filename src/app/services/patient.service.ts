import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  public getPatient(patientId: number){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/paciente?id="+patientId);
  }

  public sendPatient(patient: Patient){
    return this.http.post<any>(environment.protocol + environment.apiUrl + "/paciente", patient)
  }

  public updatePatient(patient: Patient){
    return this.http.put<any>(environment.protocol + environment.apiUrl + "/paciente", patient);
  }

  public deletePatient(patientId: any){
    return this.http.delete<any>(environment.protocol + environment.apiUrl + "/paciente?id="+patientId);
  }

  public getAllPatients(){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/paciente/todos");
  }

}
