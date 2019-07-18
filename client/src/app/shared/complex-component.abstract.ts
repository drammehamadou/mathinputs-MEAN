import { EventEmitter, Output } from "@angular/core";

export interface CaeVariable {
  name: string;
  value: any;
  unit: string;
  description: string;
}

export abstract class ComplexComponentAbstract {

  variables: Array<CaeVariable> = [];

  @Output("variableChange") variableChange = new EventEmitter<CaeVariable>();

}
