import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../entities/api.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private http: HttpClient) { }

  postWorkspace(workspace){
    return this.http.post(Api.URL+"workspace",workspace);
  }

  getWorkspace(){
    return this.http.get(Api.URL+'workspace');
  }
  getWorkspaceByDay(){
    return this.http.get(Api.URL+'workspaceDay');
  }
  getWorkspaceByHour(){
    return this.http.get(Api.URL+'workspaceHour');
  }

  getWorkspaceById(id){
    return this.http.get(Api.URL+'workspace/'+id);
  }

  getWorkspaceByUserId(id):Observable<any[]>{
    return this.http.get<any[]>(Api.URL+'workspace/user/'+id);
  }
  
}
