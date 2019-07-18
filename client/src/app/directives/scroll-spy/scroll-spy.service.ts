import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScrollSpyService {

  private scrollSubject: BehaviorSubject<[string, boolean]> = new BehaviorSubject<[string, boolean]>(['', false]);

  constructor() { }

  setVisible(id: string, visible: boolean) {
    this.scrollSubject.next([id, visible]);
  }

  observe(): Observable<[string, boolean]> {
    return this.scrollSubject.asObservable();
  }

}
