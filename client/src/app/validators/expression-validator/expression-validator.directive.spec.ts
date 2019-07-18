import { ExpressionValidatorDirective } from './expression-validator.directive';
import { FormControl } from "@angular/forms";

describe('ExpressionValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new ExpressionValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('validation should fail', () => {
    const validator = new ExpressionValidatorDirective();
    expect(validator.validate(new FormControl('2^'))).toBeTruthy();
  });

  it('validation should pass', () => {
    const validator = new ExpressionValidatorDirective();
    expect(validator.validate(new FormControl('2^2'))).toBe(null);
  });
});
