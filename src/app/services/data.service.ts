import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _messageSource = new Subject<any>();
  currentMessage$ = this._messageSource.asObservable();

  constructor() { }

  changeMessage(data) {
    this._messageSource.next(data)
  }
}
