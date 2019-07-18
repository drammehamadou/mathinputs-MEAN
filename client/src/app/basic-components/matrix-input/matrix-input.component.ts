import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UnitInputAbstract } from "../../shared/unit-input.abstract";
import { range } from "../../shared/utils";

@Component({
  selector: 'cae-matrix-input',
  templateUrl: './matrix-input.component.html',
  styleUrls: ['./matrix-input.component.scss']
})
export class MatrixInputComponent extends UnitInputAbstract implements OnInit {

  @Input("defaultRows") defaultRows: number = 1;
  @Input("defaultCols") defaultCols: number = 1;
  @Input("values") values: Array<Array<number>>;
  @Input("readOnly") readOnly: boolean;
  @Input("canAddRow") canAddRow: boolean = true;
  @Input("canAddCol") canAddCol: boolean = true;

  @Output("valuesChange") valuesChange = new EventEmitter();

  rows: number;
  cols: number;

  constructor() {
    super();
  }

  ngOnInit() {
    this.initMatrix();
  }

  onAddRow() {
    this.rows++;

    //Extend rows with zeros
    this.values.push(new Array(this.cols).fill(0));
    this.onValuesChange();
  }

  onAddColumn() {
    this.cols++;

    //Extend cols with zeros
    this.values.forEach(arr => this.addZerosToArray(arr, 1));
    this.onValuesChange();
  }

  onRemoveRow(row: number) {
    this.rows--;

    this.values.splice(row, 1);
    this.onValuesChange();
  }

  onRemoveCol(col: number) {
    this.cols--;

    this.values.forEach(arr => arr.splice(col, 1));
    this.onValuesChange();
  }

  onValuesChange() {
    this.valuesChange.emit(this.values);
  }

  canAddRows() {
    return this.canAddRow && !this.readOnly;
  }

  canAddCols() {
    return this.canAddCol && !this.readOnly;
  }

  range(from: number, to: number): Array<number> {
    return range(from, to);
  }

  private initMatrix() {
    this.rows = this.defaultRows;
    this.cols = this.defaultCols;

    if (!this.values) {
      this.values = [ [0] ];
      return;
    }

    if (this.values.length == 0) {
      this.values.push([0]);
      return;
    }

    this.rows = this.values.length;

    //Find longest array of cols
    const longestRow = this.values.reduce((pv, cv, ci, a) => a[pv].length > cv.length ? pv : ci, 0);
    this.cols = this.values[longestRow].length;

    //Extend cols with zeros if length is smaller than number of cols
    this.values.forEach(arr => this.addZerosToArray(arr, this.cols - arr.length));

    this.onValuesChange();
  }

  private addZerosToArray(array: Array<number>, zerosToAdd: number) {
    if (zerosToAdd === 0) return;

    Array.prototype.push.apply(array, new Array(zerosToAdd).fill(0));
  }

}
