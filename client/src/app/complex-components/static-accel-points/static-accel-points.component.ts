import { Component, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from "rxjs";

@Component({
  selector: 'cae-static-accel-points',
  templateUrl: './static-accel-points.component.html',
  styleUrls: ['./static-accel-points.component.scss']
})
export class StaticAccelPointsComponent implements OnInit {

  selectValue: string;

  svgPath: string = 'assets/svg/vehicle-blueprint.svg';
  svgEvent: Subject<[string, boolean]> = new ReplaySubject<[string, boolean]>();

  constructor() { }

  ngOnInit() {
    this.svgEvent.next(['frontMotor', false]);
  }

  onChange(id: string, value: boolean) {
    this.svgEvent.next([id, value]);
  }

  testFunction(row: any) {
    console.log('CLICKED ROW!', row);
  }

}
