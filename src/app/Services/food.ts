import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor (private http: HttpClient) { }

  search_food(search: any):Observable<any> {
    return this.http.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
  }

  search_by_id(id: any):Observable<any> {
    return this.http.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  }

  search_by_country(country: any):Observable<any> {
    return this.http.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
  }
}
