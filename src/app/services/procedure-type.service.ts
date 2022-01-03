import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProcedureType } from '../models/procedure-type';

@Injectable({
  providedIn: 'root'
})
export class ProcedureTypeService {

  constructor(private http: HttpClient) { }

  public getProcedureType(procedureTypeId: number){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/tipo-procedimiento?id="+procedureTypeId);
  }

  public sendProcedureType(procedureType: ProcedureType){
    return this.http.post<any>(environment.protocol + environment.apiUrl + "/tipo-procedimiento", procedureType)
  }

  public updateProcedureType(procedureType: ProcedureType){
    return this.http.put<any>(environment.protocol + environment.apiUrl + "/tipo-procedimiento", procedureType);
  }

  public deleteProcedureType(procedureTypeId: number){
    return this.http.delete<any>(environment.protocol + environment.apiUrl + "/tipo-procedimiento?id="+procedureTypeId);
  }

  public getAllProcedureTypes(){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/tipo-procedimiento/todos");
  }

}
