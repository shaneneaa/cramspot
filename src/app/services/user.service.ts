import { Injectable } from '@angular/core';
import { Api } from '../entities/api.class';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = Api.URL+'user';

  constructor(private http: HttpClient) {}

  getUserById(id){
    return this.http.get(this.apiUrl+'/'+id);
  }
}
