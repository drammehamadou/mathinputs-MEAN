import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CaeVariable, ComplexComponentAbstract } from "../../shared/complex-component.abstract";

@Component({
  selector: 'cae-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  providers: [{provide: ComplexComponentAbstract, useExisting: forwardRef(() => VehicleComponent)}]
})
export class VehicleComponent extends ComplexComponentAbstract implements OnInit {

  @Input('order') order: number = null;

  aerodynamicVariables: Array<CaeVariable> = [
    {name: 'CdA', value: 0.37, unit: null, description: null},
    {name: 'A', value: 3, unit: 'm^2', description: null},
    {name: 'F0', value: 180, unit: 'N', description: null},
    {name: 'F1_coeff', value: 0, unit: 'N/(ms-1)', description: null},
    {name: 'F2_coeff', value: 0, unit: 'N/(ms-1)^2', description: null}
  ];

  massVariables: Array<CaeVariable> = [
    {name: 'Perf', value: 2500, unit: 'kg', description: 'Performance mass'},
    {name: 'Fuel', value: 2500, unit: 'kg', description: 'Fuel economy mass'},
    {name: 'Grad', value: 3500, unit: 'kg', description: 'Gradeability mass'},
    {name: 'Kerb', value: 2500, unit: 'kg', description: 'Kerb mass'},
    {name: 'Gros', value: 0, unit: 'kg', description: 'Gross mass'},
    {name: 'Tral', value: 0, unit: 'kg', description: 'Trailer mass'}
  ];

  wheelsVariables: Array<CaeVariable> = [
    {name: 'TyreSiz', value: '255/55 R16', unit: null, description: 'Tyre size'},
    {name: 'RollingRad', value: 0.3386, unit: 'm', description: 'Rolling radius'},
    {name: 'RollingRes', value: 0.83, unit: null, description: 'Rolling resistance'},
    {name: 'FricCoef', value: 0.9, unit: '%', description: 'Friction coefficient'},
  ];

  variables: Array<CaeVariable> = [];

  constructor() {
    super();

    this.variables = this.variables.concat(this.aerodynamicVariables);
    this.variables = this.variables.concat(this.massVariables);
    this.variables = this.variables.concat(this.wheelsVariables);
  }

  ngOnInit() {
  }

}
