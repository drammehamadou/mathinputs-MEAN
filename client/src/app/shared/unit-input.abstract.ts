import { EventEmitter, Input, Output } from '@angular/core';
import { MathComponentAbstract } from './math-component.abstract';

export abstract class UnitInputAbstract extends MathComponentAbstract {

  @Input('units') units: Array<string>;
  @Input('unit') unit: string;

  @Output('unitChange') unitChange = new EventEmitter();

  onUnitSelect(unit) {
    this.unit = unit;
    this.unitChange.emit(unit);
  }

}
