import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { SolverService } from "../../services/solver/solver.service";
import { UnitInputAbstract } from "../../shared/unit-input.abstract";
import { ParagraphParent } from "../../shared/paragraph-parent.abstract";

@Component({
  selector: 'cae-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent extends UnitInputAbstract {

  @Input("name") name: string;
  @Input("variable") variable: number;
  @Input("readOnly") readOnly: boolean;

  @Output("variableChange") variableChange = new EventEmitter();

  constructor(@Optional() private parent: ParagraphParent, private solverService: SolverService) {
    super();
    super.initVariable(this.parent, this.solverService);
  }

  ngOnInit() {
  }

  onVariableChange() {
    this.variableChange.emit(this.variable);
  }

}
