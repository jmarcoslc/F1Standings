import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable, Subject, BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class FilterService {

  private filtr_term_sub:Subject<any> = new Subject<any>();;

  constructor() { }

  setFilterTerm(filter_term:string) {
  	this.filtr_term_sub.next(filter_term);
  }

  getFilterTerm() {
  	return this.filtr_term_sub.asObservable();
  }
}
