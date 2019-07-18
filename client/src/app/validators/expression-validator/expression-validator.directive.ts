import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import * as MathJS from 'mathjs';

@Directive({
  selector: '[caeExpressionValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ExpressionValidatorDirective), multi: true }
  ]
})
export class ExpressionValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } {
    const expression = control.value? control.value.toString() : '';

    try {
      MathJS.compile(expression);
    } catch (e) {
      return { 'wrongExpression': { message: e } }
    }

    return null;
  }

}
