import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../entities/api.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  postFeed(feed){
    return this.http.post(Api.URL+'feed',feed);
  }

  getFeed():Observable<any[]>{
    return this.http.get<any[]>(Api.URL+'feed');
  }
}
