import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as c3 from 'c3';
import * as MathJS from "mathjs";

@Component({
  selector: 'cae-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {

  private static id = 0;

  @Input("type") type: string = 'line';

  @Input("x") x: Array<number> = [];
  @Input("y") y: Array<number> | Array<Array<number>> = [];

  @Input("xUnit") xUnit: string;
  @Input("yUnit") yUnit: string;

  @Input("xUnits") xUnits: Array<string>;
  @Input("yUnits") yUnits: Array<string>;

  @Input("xLabel") xLabel: string;
  @Input("yLabel") yLabel: string;
  @Input("y2Label") y2Label: string;

  @Input("dataNames") dataNames: Array<string> = null;
  @Input("axes") axes: { [key: string]: string; } = {};

  @Input("zoom") zoom: boolean = true;

  selectedXUnit: string;
  selectedYUnit: string;

  private chart: any;
  private readonly chartId: string = `chart-${ChartComponent.id++}`;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.chart = c3.generate({
      bindto: `#${this.chartId}`,
      data: {
        x: 'x',
        columns: this.getColumns(),
        type: this.type,
        axes: this.axes
      },
      grid: {
        y: {
          show: true
        }
      },
      legend: {
        show: !!this.dataNames
      },
      zoom: {
        enabled: this.zoom
      },
      axis: {
        x: {
          label: {
            text: this.xLabel,
            position: 'outer-center'
          },
          tick: {
            fit: true
          }
        },
        y: {
          label: {
            text: this.yLabel,
            position: 'outer-middle'
          }
        },
        y2: {
          show: !!this.y2Label,
          label: {
            text: this.y2Label,
            position: 'outer-middle'
          }
        }
      }
    });

    setTimeout(() => this.setDefaultUnits());
  }

  ngOnChanges(changes: SimpleChanges) {
    const xChange = changes.x;
    const yChange = changes.y;

    if ((xChange && !xChange.firstChange) || (yChange && !yChange.firstChange)) {
     this.selectedXUnit = this.xUnit;
     this.selectedYUnit = this.yUnit;

     this.update();
    }
  }

  onXUnitSelect(unit) {
    this.x = Array.prototype.map.call(this.x, x => MathJS.unit(x, this.xUnit).toNumber(unit));

    this.selectedXUnit = unit;
    this.update();
  }

  onYUnitSelect(unit) {
    if (this.isYNestedArray()) {
      this.y = Array.prototype.map.call(this.y, yData => yData.map(y => MathJS.unit(y, this.yUnit).toNumber(unit)));
    } else {
      this.y = Array.prototype.map.call(this.y, y => MathJS.unit(y, this.yUnit).toNumber(unit));
    }

    this.selectedYUnit = unit;
    this.update();
  }

  private update() {
    this.chart.load({
      columns: this.getColumns()
    });
  }

  private getColumns(): Array<Array<number>> {
    const columns: Array<Array<number>> = [ Array.prototype.concat(['x'], this.x) ];

    if (this.isYNestedArray()) {
      for (let i = 0; i < this.y.length; i++) {
        const dataName = this.getDataName(i) || `data${i}`;
        const arr = Array.prototype.concat([dataName], this.y[i]);
        columns.push(arr);
      }
    } else {
      const dataName = this.getDataName(0) || 'data';
      columns.push(Array.prototype.concat([dataName], this.y));
    }

    return columns;
  }

  private getDataName(index: number): string {
    return this.dataNames? this.dataNames[index] : null;
  }

  private isYNestedArray(): boolean {
    return this.y && this.y.length > 0 && Array.isArray(this.y[0]);
  }

  private setDefaultUnits() {
    if (!this.xUnit && this.xUnits && this.xUnits.length > 0) {
      this.selectedXUnit = this.xUnits[0];
    } else {
      this.selectedXUnit = this.xUnit;
    }

    if (!this.yUnit && this.yUnits && this.yUnits.length > 0) {
      this.selectedYUnit = this.yUnits[0];
    } else {
      this.selectedYUnit = this.yUnit;
    }
  }

}
