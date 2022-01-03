import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FamiliarDisease } from '../models/familiar-disease';

@Injectable({
  providedIn: 'root'
})
export class FamiliarDiseaseService {

  constructor(private http: HttpClient) { }

  public getFamiliarDisease(familiarDiseaseId: number){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/enfermedad-familiar?id="+familiarDiseaseId);
  }

  public sendFamiliarDisease(familiarDisease: FamiliarDisease){
    return this.http.post<any>(environment.protocol + environment.apiUrl + "/enfermedad-familiar", familiarDisease)
  }

  public updateFamiliarDisease(familiarDisease: FamiliarDisease){
    return this.http.put<any>(environment.protocol + environment.apiUrl + "/enfermedad-familiar", familiarDisease);
  }

  public deleteFamiliarDisease(familiarDiseaseId: number){
    return this.http.delete<any>(environment.protocol + environment.apiUrl + "/enfermedad-familiar?id="+familiarDiseaseId);
  }

  public getAllFamiliarDiseases(){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/enfermedad-familiar/todos");
  }

}
