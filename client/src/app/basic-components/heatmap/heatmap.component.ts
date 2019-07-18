import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cae-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {

  @Input("values") values: Array<Array<number>>;
  @Input("xLabels") xLabels: Array<string | number>;
  @Input("yLabels") yLabels: Array<string | number>;

  @Input("xTitle") xTitle: string;
  @Input("yTitle") yTitle: string;

  @Input("xUnit") xUnit: string;
  @Input("yUnit") yUnit: string;

  @Input("startColor") startColor: string = "#82ffbe";
  @Input("middleColor") middleColor: string = "#fff482";
  @Input("endColor") endColor: string = "#ff8282";

  @Input("opacity") opacity: number = 1;

  @Input("showValues") showValues: boolean = true;

  private maxValue: number = 0;
  private minValue: number = 0;
  private uniqueValues: Array<number> = [];

  private colors: Map<number, Array<number>> = new Map<number, Array<number>>();

  constructor() { }

  ngOnInit() {
    this.setValuesProperties();
    this.mapColorsToValues(this.startColor, this.middleColor, this.endColor);
  }

  getColor(value: number): string {
    if (value === null) {
      return 'rgb(255, 255, 255)';
    }

    const color = this.colors.get(value);
    return `rgb(${color[0]}, ${color[1]}, ${color[2]}, ${this.opacity})`;
  }

  getYLabel(idx: number): string | number {
    if (idx >= this.yLabels.length)
      return "-";

    return this.yLabels[idx];
  }

  getTitles(): string {
    return `${this.yTitle || '-'} [${this.yUnit}] \\ ${this.xTitle || '-'} [${this.xUnit}]`;
  }

  private setValuesProperties() {
    const flattenValues = Array.prototype.concat.apply([], this.values);

    this.uniqueValues = flattenValues
      .filter(v => v !== null)
      .filter((v, i, a) => a.indexOf(v) === i);
    this.maxValue = Math.max(...this.uniqueValues);
    this.minValue = Math.min(...this.uniqueValues);
  }

  private interpolateColor(color1: Array<number>, color2: Array<number>, factor: number): Array<number> {
    const result = [...color1];
    for (let i = 0; i < 3; ++i) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
  }

  private mapColorsToValues(startColorHex: string, middleColorHex: string, endColorHex: string) {
    const half = Math.floor(this.uniqueValues.length / 2);
    const factorA = 1 / half;
    const factorB = 1 / (half - 1);
    const startColor = this.hexToRgbArray(startColorHex);
    const middleColor = this.hexToRgbArray(middleColorHex);
    const endColor = this.hexToRgbArray(endColorHex);

    for (let i = 0; i < half; ++i) {
      let color = this.interpolateColor(startColor, middleColor, factorA * i);
      this.colors.set(this.uniqueValues[i], color);
    }

    for (let i = 0; i < half; ++i) {
      let color = this.interpolateColor(middleColor, endColor, factorB * i);
      this.colors.set(this.uniqueValues[half + i], color);
    }

    if (this.uniqueValues.length / 2 - half > 0) {
      let color = this.interpolateColor(middleColor, endColor, 1.0);
      this.colors.set(this.uniqueValues[this.uniqueValues.length - 1], color);
    }
  }

  private hexToRgbArray(hexColor: string): Array<number> {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16) ] : [];
  }

  private rgbArrayToHex(rgb: Array<number>): string {
    let color = "#";
    for (let i = 0; i < 3; i++) {
      let component = rgb[i].toString(16);
      color += (component.length === 1? "0" + component : component);
    }
    return color;
  }

}
