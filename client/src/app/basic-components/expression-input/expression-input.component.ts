import { Component, EventEmitter, Input, OnChanges, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { SolverService } from '../../services/solver/solver.service';
import { MathComponentAbstract } from '../../shared/math-component.abstract';
import { ParagraphParent } from "../../shared/paragraph-parent.abstract";

@Component({
  selector: 'cae-expression-input',
  templateUrl: './expression-input.component.html',
  styleUrls: ['./expression-input.component.scss']
})
export class ExpressionInputComponent extends MathComponentAbstract implements OnInit, OnChanges {

  @Input("expression") expression: string = '';
  @Input("readOnly") readOnly: boolean = false;

  @Output("expressionChange") expressionChange = new EventEmitter();

  constructor(@Optional() private parent: ParagraphParent, private solverService: SolverService) {
    super();
    super.initExpression(this.expression, this.parent, this.solverService);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expression && !changes.currentValue) {
      this.onExpressionChange(changes.expression.currentValue);
    }
  }

  onExpressionChange(expression) {
    this.expression = expression;
    this.expressionChange.emit(this.expression);
    this.solverService.updateEquation(this.label, this.expression);
  }

}
