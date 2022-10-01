import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }
  getData(city_name, country_name) {
    const url = 'https://cost-of-living-and-prices.p.rapidapi.com/prices' +
      '?city_name=' + city_name + '&country_name=' + country_name;
    return this.http.get(url, {
      headers: new HttpHeaders({
        "x-rapidapi-host": "cost-of-living-and-prices.p.rapidapi.com",
        "x-rapidapi-key": "Your API Key Here"
      })
    });
  }
}
