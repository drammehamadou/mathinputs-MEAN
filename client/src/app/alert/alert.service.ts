import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

export enum AlertType {
  SUCCESS, FAILURE, INFO, WARNING
}

export enum AlertTime {
  SHORT = 2000, // ms
  LONG = 4000 // ms
}

export interface Alert {
  type: AlertType;
  time: AlertTime;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly status: BehaviorSubject<Alert>;

  constructor() {
    this.status = new BehaviorSubject(null);
  }

  getStatus(): BehaviorSubject<Alert> {
    return this.status;
  }

  show(alert: Alert) {
    this.status.next(alert);
  }

}
