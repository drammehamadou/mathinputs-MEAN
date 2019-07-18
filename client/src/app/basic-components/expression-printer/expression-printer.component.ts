import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as MathJS from "mathjs";

declare var MathJax: {
  Hub: {
    Queue: (param: Object[]) => void;
  }
};

@Component({
  selector: 'cae-expression-printer',
  templateUrl: './expression-printer.component.html',
  styleUrls: ['./expression-printer.component.scss']
})
export class ExpressionPrinterComponent implements OnInit, OnChanges {

  @Input('expression') expression: string;
  @Input('parenthesis') parenthesis: string = 'keep';
  @Input('implicit') implicit: string = 'hide';

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.printExpression();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.printExpression();
  }

  private printExpression() {
    if (!this.expression) return;

    try {
      const options = { parenthesis: this.parenthesis, implicit: this.implicit };
      const latex = MathJS.parse(this.expression).toTex(options);
      this.element.nativeElement.innerText = `$$${latex}$$`;

      MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.element.nativeElement]);
    } catch (e) {

    }
  }

}
