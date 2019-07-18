import { Component, forwardRef, OnInit } from '@angular/core';
import { CaeVariable, ComplexComponentAbstract } from "../../shared/complex-component.abstract";

@Component({
  selector: 'cae-motor-efficiency',
  templateUrl: './motor-efficiency.component.html',
  styleUrls: ['./motor-efficiency.component.scss'],
  providers: [{provide: ComplexComponentAbstract, useExisting: forwardRef(() => MotorEfficiencyComponent)}]
})
export class MotorEfficiencyComponent extends ComplexComponentAbstract implements OnInit {

  variables: Array<CaeVariable> = [
    {name: 'n', value: 0, unit: null, description: null },
    {name: 'P', value: 0, unit: null, description: null },
    {name: 'RV', value: [ [2, 3, 5], [5, 5, 10] ], unit: null, description: null }
  ];

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onChange(valueIdx: number, value: any) {
    this.variables[valueIdx].value = value;
    this.variableChange.emit(this.variables[valueIdx]);
  }

}
