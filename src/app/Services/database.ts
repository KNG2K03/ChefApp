import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor (private http: HttpClient) { }

  sign_up(userInfo:any):Observable<any> {
    return this.http.post(`http://localhost:4000/signup`, {
      user: userInfo
    })
  }

  sign_in(userInfo:any):Observable<any> {
    return this.http.post(`http://localhost:4000/signin`, {
      user: userInfo
    })
  }
}
