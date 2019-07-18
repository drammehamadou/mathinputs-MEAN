import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MathComponentAbstract } from "../../shared/math-component.abstract";
import { SolverService } from "../../services/solver/solver.service";
import { ParagraphParent } from "../../shared/paragraph-parent.abstract";

@Component({
  selector: 'cae-knob-input',
  templateUrl: './knob-input.component.html',
  styleUrls: ['./knob-input.component.scss']
})
export class KnobInputComponent extends MathComponentAbstract implements OnChanges {

  @ViewChild('canvas') public canvas: ElementRef;
  @ViewChild('input') public input: ElementRef;

  @Input('min') min: number = 0;
  @Input('max') max: number = 100;

  @Input('variable') variable: number = 0;
  @Input('step') step: number = 0.01;

  @Input('lineWidth') lineWidth: number = 15;
  @Input('color') color: string = '#064CDB';

  @Input('displayInput') displayInput: boolean = true;
  @Input('readOnly') readonly: boolean = false;

  @Output('variableChange') variableChange = new EventEmitter();

  private radius: number = 0;
  private size: number = 0;

  private dragging: boolean = false;

  private ctx: CanvasRenderingContext2D;

  constructor(@Optional() private parent: ParagraphParent, private solverService: SolverService) {
    super();
    super.initVariable(this.parent, this.solverService);
  }

  ngOnInit() {
    this.calculateSizesAndValues();

    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = this.lineWidth;

    this.drawKnob();

    window.addEventListener('mouseup', (event) => this.onMouseUp(event));
    window.addEventListener('mousemove', (event) => this.onMouseMove(event));
  }

  ngOnChanges(changes: SimpleChanges) {
    const variableChange = changes.variable;

    if (variableChange.currentValue) {
      this.variable = this.clamp(variableChange.currentValue, this.min, this.max);
      if (!variableChange.firstChange) this.drawKnob();
    }
  }

  onVariableChange() {
    this.variable = this.clamp(this.variable, this.min, this.max);

    this.snapValue();
    this.drawKnob();
    this.variableChange.emit(this.variable);
  }

  onMouseWheel(e) {
    e.preventDefault();

    const value = -Math.sign(e.deltaY) * this.step;
    this.variable = this.clamp(this.variable + value, this.min, this.max);
    this.drawKnob();
    this.variableChange.emit(this.variable);
  }

  onMouseDown(e) {
    this.dragging = true;
  }

  onMouseClick(e) {
    if (this.readonly) return;

    this.calculateValue(e);
    this.drawKnob();
    this.variableChange.emit(this.variable);
  }

  private onMouseUp(e) {
    this.dragging = false;
  }

  private onMouseMove(e) {
    if (this.readonly) return;

    if (e.target.tagName == 'CANVAS') {
      e.preventDefault();
    }

    if (!this.dragging) return;

    this.calculateValue(e);
    this.drawKnob();
    this.variableChange.emit(this.variable);
  }

  private calculateValue(e) {
    const canvasBB = this.canvas.nativeElement.getBoundingClientRect();

    // Calculate cursor position in regard to knob origin
    const x = e.x - (canvasBB.x + this.radius + this.lineWidth);
    const y = -(e.y - canvasBB.y - this.radius - this.lineWidth);

    // Get the angle of the position (polar coordinates angle)
    let theta = Math.atan2(y, -x) - Math.PI / 2;
    if (theta < 0) {
      theta += Math.PI * 2;
    }

    // Calculate variable from range of min and max
    let v = (theta * this.max / (Math.PI * 2));
    this.variable = this.clamp(v, this.min, this.max);
    this.snapValue();
  }

  private drawKnob() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.size, this.size);

    // Draw back trace
    this.ctx.strokeStyle = '#ddd';
    this.ctx.beginPath();
    this.ctx.arc(
      this.radius + this.lineWidth,
      this.radius + this.lineWidth,
      this.radius >= 0? this.radius : 0.0,
      this.toRadians(0),
      this.toRadians(360),
      false
    );
    this.ctx.closePath();
    this.ctx.stroke();

    // Draw variable
    const startAngle = this.toRadians(0) - Math.PI / 2;
    const endAngle = this.getEndAngle(this.variable) - Math.PI / 2;

    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.radius + this.lineWidth,
      this.radius + this.lineWidth,
      this.radius >= 0? this.radius : 0.0,
      startAngle,
      endAngle,
      false
    );
    this.ctx.stroke();
  }

  private snapValue() {
    this.variable = this.step * Math.floor((this.variable / this.step) + 0.5);
  }

  private getEndAngle(value: number): number {
    return this.toRadians(360.0 * value / this.max);
  }

  private toRadians(angle: number): number {
    return angle * Math.PI / 180.0;
  }

  private clamp(value: number, min: number, max: number): number {
    return value <= min? min : value >= max? max : value;
  }

  private calculateSizesAndValues() {
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;
    canvas.style.height = '100%';

    this.size = canvas.offsetHeight;

    canvas.height = this.size;
    canvas.width  = this.size;

    this.radius = (this.size / 2) - this.lineWidth;

    const input: HTMLInputElement = this.input.nativeElement;
    input.style.width = `${this.size / 2 - 2}px`;
    input.style.height = `${this.size / 4}px`;
    input.style.top = `${3 / 8 * this.size}px`;
    input.style.left = `${this.size / 4 + 1}px`;
    input.style.fontSize = `${this.size / 5}px`;
    input.style.color = this.color;

    if (!this.displayInput) {
      input.style.visibility = 'hidden';
    }
  }

}
