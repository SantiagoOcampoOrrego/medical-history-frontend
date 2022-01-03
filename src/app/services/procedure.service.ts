import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Procedure } from '../models/procedure';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  constructor(private http: HttpClient) { }

  public getProcedure(procedureId: number){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/procedimiento?id="+procedureId);
  }

  public sendProcedure(procedure: Procedure){
    return this.http.post<any>(environment.protocol + environment.apiUrl + "/procedimiento", procedure)
  }

  public updateProcedure(procedure: Procedure){
    return this.http.put<any>(environment.protocol + environment.apiUrl + "/procedimiento", procedure);
  }

  public deleteProcedure(procedureId: number){
    return this.http.delete<any>(environment.protocol + environment.apiUrl + "/procedimiento?id="+procedureId);
  }

  public getAllProcedures(){
    return this.http.get<any>(environment.protocol + environment.apiUrl + "/procedimiento/todos");
  }

}
