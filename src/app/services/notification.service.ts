import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Api } from '../entities/api.class';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  api_url:string = Api.URL+'notification';

  constructor(private http: HttpClient) { }

  postNotification(notification){
    return this.http.post(this.api_url,notification);
  }

  fetchNotification(): Observable<any[]>{
    return this.http.get<any[]>(this.api_url);
  }

  confirmNotification(notification){
    return this.http.post(this.api_url+'/confirm',notification);
  }

  deleteNotification(notification){
    return this.http.request('delete',this.api_url,{
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      }),
      body: notification});
  }
  getNotificationById(id){
    return this.http.get(Api.URL+'notification/'+id);
  }

}
