import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  public getDoctor(doctorId: number){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/doctor?id="+doctorId);
  }

  public sendDoctor(doctor: Doctor){
    return this.http.post<any>(environment.protocol + environment.apiUrl + "/doctor", doctor)
  }

  public updateDoctor(doctor: Doctor){
    return this.http.put<any>(environment.protocol + environment.apiUrl + "/doctor", doctor);
  }

  public deleteDoctor(doctorId: number){
    return this.http.delete<any>(environment.protocol + environment.apiUrl + "/doctor?id="+doctorId);
  }

  public getAllDoctors(){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/doctor/todos");
  }

}
