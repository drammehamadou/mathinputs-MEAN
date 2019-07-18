import { Component, OnInit } from '@angular/core';
import { Alert, AlertService, AlertType } from "./alert.service";

@Component({
  selector: 'cae-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alerts: Array<Alert> = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getStatus()
      .subscribe(alert => this.showAlert(alert));
  }

  getAlertClass(alert: Alert): string {
    switch (alert.type) {
      case AlertType.SUCCESS:
        return 'alert-success';
      case AlertType.FAILURE:
        return 'alert-danger';
      case AlertType.INFO:
        return 'alert-info';
      case AlertType.WARNING:
        return 'alert-warning';
    }
  }

  getAlertIcon(alert: Alert): string {
    switch (alert.type) {
      case AlertType.SUCCESS:
        return 'icon-check2';
      case AlertType.FAILURE:
        return 'icon-zap';
      case AlertType.INFO:
        return 'icon-life-buoy2';
      case AlertType.WARNING:
        return 'icon-alert-circle';
    }
  }

  getAlertTitle(alert: Alert): string {
    switch (alert.type) {
      case AlertType.SUCCESS:
        return 'Success';
      case AlertType.FAILURE:
        return 'Failure';
      case AlertType.INFO:
        return 'Info';
      case AlertType.WARNING:
        return 'Warning';
    }
  }

  close(index: number) {
    this.alerts.splice(index, 1);
  }

  showAlert(alert: Alert) {
    if (!alert) return;

    const index = this.alerts.push(alert) - 1;
    setTimeout(_ => this.close(index), alert.time);
  }

}
