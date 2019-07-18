import { Input } from "@angular/core";
import { SolverService } from "../services/solver/solver.service";
import { ParagraphParent } from "./paragraph-parent.abstract";

export abstract class MathComponentAbstract {

  @Input("name") name: string = '';

  prefix: string = '';
  label: string = '';

  /**
   * Must be called in ngOnInit for variable registration
   * @param parent
   * @param solverService
   */
  initVariable(parent: ParagraphParent, solverService: SolverService) {
    this.prefix = parent? parent.name : '';
    this.label = solverService.registerVariable(this.prefix? `${this.prefix}.${this.name}` : this.name);
  }

  /**
   * Must be called in ngOnInit for expression registration
   * @param expression
   * @param parent
   * @param solverService
   */
  initExpression(expression: string, parent: ParagraphParent, solverService: SolverService) {
    this.prefix = parent? parent.name : '';
    this.label = solverService.registerExpression(this.prefix, expression);
  }

  getPrefixedName(): string {
    return (this.prefix? this.prefix + '.' : '') + this.name;
  }

}
