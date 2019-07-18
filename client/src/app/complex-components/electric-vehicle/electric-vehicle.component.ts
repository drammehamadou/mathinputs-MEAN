import { AfterViewInit, Component, forwardRef, OnInit } from '@angular/core';
import { SolverService } from "../../services/solver/solver.service";
import { MotorEfficiencyComponent } from "../motor-efficiency/motor-efficiency.component";
import { LocalScopeEvent } from "../../shared/local-scope-event";
import { ReplaySubject, Subject } from "rxjs";
import { Location } from '@angular/common';
import { CaeVariable, ComplexComponentAbstract } from "../../shared/complex-component.abstract";

@Component({
  selector: 'cae-electric-vehicle',
  templateUrl: './electric-vehicle.component.html',
  styleUrls: ['./electric-vehicle.component.scss'],
  providers: [{provide: ComplexComponentAbstract, useExisting: forwardRef(() => ElectricVehicleComponent)}]
})
export class ElectricVehicleComponent extends ComplexComponentAbstract implements OnInit, AfterViewInit {

  variables: Array<CaeVariable> = [ {name: 'mass', value: 0, unit: 't', description: null} ];

  Cmpt = MotorEfficiencyComponent;
  params: Array<[string, any]> = [];

  paragraphName: string = "ev";
  motorsName: string = "motors";

  numberOfMotors: number = 4;

  massUnits: Array<string> = ['t', 'kg'];

  expression: string = `sum(get(${this.paragraphName}.${this.motorsName}, 'n')) / size(${this.paragraphName}.${this.motorsName})`;//"sum(get(ev.motors, 'RV')) / ev.motors[1].RV[1,1]";
  result: number = null;

  svgPath: string = 'assets/svg/vehicle-blueprint.svg';
  svgEvent: Subject<[string, boolean]> = new ReplaySubject<[string, boolean]>();

  constructor(private solverService: SolverService, private location: Location) {
    super();
  }

  ngOnInit() {
    this.svgEvent.next(['frontMotor', false]);
  }

  ngAfterViewInit() {
    this.solverService.getUpdates()
      .subscribe(value => setTimeout(() => this.result = value));
  }

  onEvaluate(event: LocalScopeEvent) {
    const scope = {};
    scope[event.name] = event.scopes;

    this.solverService.evaluate(scope);
  }

  onChange(id: string, value: boolean) {
    this.svgEvent.next([id, value]);
  }

  onElementClicked(id: string) {
    let name: string = null;
    switch (id) {
      case "frontLeftWheelMotor":
        name = `${this.paragraphName}.${this.motorsName}_0_`;
        break;

      case "frontRightWheelMotor":
        name = `${this.paragraphName}.${this.motorsName}_1_`;
        break;

      case "backLeftWheelMotor":
        name = `${this.paragraphName}.${this.motorsName}_2_`;
        break;

      case "backRightWheelMotor":
        name = `${this.paragraphName}.${this.motorsName}_3_`;
        break;
    }

    const el = document.getElementById(name);
    el && el.scrollIntoView();

    if (name) {
      this.location.go('#' + name);
    }
  }

}
