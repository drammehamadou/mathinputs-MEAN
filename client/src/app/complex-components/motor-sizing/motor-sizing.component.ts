import { Component, forwardRef, OnInit } from '@angular/core';
import { CaeVariable, ComplexComponentAbstract } from "../../shared/complex-component.abstract";

@Component({
  selector: 'cae-motor-sizing',
  templateUrl: './motor-sizing.component.html',
  styleUrls: ['./motor-sizing.component.scss'],
  providers: [{provide: ComplexComponentAbstract, useExisting: forwardRef(() => MotorSizingComponent)}]
})
export class MotorSizingComponent extends ComplexComponentAbstract implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
