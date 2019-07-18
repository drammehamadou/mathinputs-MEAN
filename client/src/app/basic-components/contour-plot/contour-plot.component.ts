import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import * as d3 from 'd3';
import { interpolateSpectral } from "d3-scale-chromatic";
import { ContourMultiPolygon, contours } from 'd3-contour';
import { ScaleLogarithmic } from "d3";

@Component({
  selector: 'cae-contour-plot',
  templateUrl: './contour-plot.component.html',
  styleUrls: ['./contour-plot.component.scss']
})
export class ContourPlotComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('plotContainer') plotContainer: ElementRef;

  @Input("values") values: Array<number> = [];// each value must be in range [0;1]
  @Input("thresholds") thresholds: Array<number> = [];
  @Input("n") n: number = 0;
  @Input("m") m: number = 0;

  @Input("xDomain") xDomain: [number, number] = [0, 100];
  @Input("yDomain") yDomain: [number, number] = [100, 0];

  @Input("strokeColor") strokeColor: string = "";
  @Input("strokeWidth") strokeWidth: number = 0.25;

  @Input("legend") legend: boolean = true;

  @Input("xAxis") xAxis: boolean = true;
  @Input("yAxis") yAxis: boolean = true;

  @Input("filled") filled: boolean = true;
  @Input("interactivePlot") interactivePlot: boolean = true;

  @Output("onSelect") onSelect: EventEmitter<number> = new EventEmitter();

  private width: number = 0;
  private height: number = 0;

  private xAxisPadding: number = 20;
  private yAxisPadding: number = 20;

  private thresholdValues: ContourMultiPolygon[] = [];
  private color: ScaleLogarithmic<number, string> = null;

  private hoveredValue: number = null;

  constructor() { }

  ngOnInit() {
    this.color = d3.scaleLog()
      .domain(d3.extent(this.thresholds))
      .interpolate(_ => (t) => interpolateSpectral(1 - t));// inverse colors

    this.calculateSizes();

    window.addEventListener("resize", () => {
      this.calculateSizes();
      this.draw();
    });
  }

  ngAfterViewInit() {
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges) {
    const changeValues: SimpleChange = changes.values;
    const changeThresholds: SimpleChange = changes.thresholds;

    if (changeValues && !changeValues.firstChange || changeThresholds && !changeThresholds.firstChange) {
      this.draw();
    }
  }

  private calculateSizes() {
    const container: HTMLDivElement = this.plotContainer.nativeElement;

    this.width = container.offsetWidth;
    this.height = container.offsetHeight;
  }

  private draw() {
    this.drawPlot();

    this.xAxis && this.drawXAxis();
    this.yAxis && this.drawYAxis();
    this.legend && this.drawLegend();
  }

  private drawPlot() {
    this.clearPlot();

    if (!this.n || !this.m) return;

    const contourFunction = contours()
      .size([this.n, this.m])
      .thresholds(this.thresholds);

    this.thresholdValues = contourFunction(this.values);

    const xScale = (this.width - this.yAxisPadding) / this.n;
    const yScale = (this.height - this.xAxisPadding) / this.m;

    const geoPath = d3.geoPath(d3.geoIdentity());

    const plot = d3.select("#plot")
      .selectAll("path")
      .data(this.thresholdValues)
      .enter()
      .append("path")
        .attr("transform", `translate(${this.yAxisPadding}, 0) scale(${xScale}, ${yScale})`)
        .attr("width", this.width)
        .attr("d", geoPath)
        .attr("stroke-width", this.strokeWidth)
        .on("click", d => this.onSelect.emit(d.value));

    if (this.interactivePlot) {
      plot.on("mouseover", d => {
        this.hoveredValue = d.value;
        this.drawLegend();
      })
      .on("mouseout", d => {
        this.hoveredValue = null;
        this.drawLegend();
      });
    }

    if (this.filled) {
      plot.attr("stroke", this.strokeColor)
        .attr("fill", d => this.color(d.value));
    } else {
      plot.attr("stroke", d => this.color(d.value))
        .attr("fill", "#fff");
    }
  }

  private drawXAxis() {
    const xAxisScale = d3.scaleLinear()
      .domain(this.xDomain)
      .range([this.yAxisPadding, this.width] as ReadonlyArray<number>);

    const xAxis = d3.axisBottom(xAxisScale);

    d3.select("#plot")
      .append("g")
        .attr("width", this.width)
        .attr("transform", `translate(0, ${this.height - this.xAxisPadding})`)
        .call(xAxis)
  }

  private drawYAxis() {
    const yAxisScale = d3.scaleLinear()
      .domain(this.yDomain)
      .range([0, (this.height - this.xAxisPadding)] as ReadonlyArray<number>);

    const yAxis = d3.axisLeft(yAxisScale);

    d3.select("#plot")
      .append("g")
        .attr("transform", `translate(${this.yAxisPadding}, 0)`)
        .attr("height", this.height)
        .call(yAxis)
  }

  private drawLegend() {
    this.clearLegend();

    const _class = this;

    const legendDomain: ReadonlyArray<string> = [0, ...this.thresholdValues.map(v => v.value)]
      .map(v => v.toString());
    const upperRange = legendDomain.length * this.height / legendDomain.length;

    const legendAxisScale = d3.scalePoint()
      .domain(legendDomain)
      .rangeRound([0, upperRange]);

    const step = legendAxisScale.step();
    const align = legendAxisScale.align();

    const legendAxis = d3.axisRight(legendAxisScale);

    d3.select("#legend")
      .attr("width", step * 2)
      .selectAll("rect")
      .data(this.thresholdValues)
      .enter()
      .append("rect")
      .each(function (d: ContourMultiPolygon, i: number) {
        d3.select(this)
          .attr("transform", `translate(0, ${align + i * step})`)
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("width", step)
          .attr("height", step + align)
          .attr("fill", _ => _class.color(d.value))
          .attr("opacity", _ => (_class.hoveredValue && _class.hoveredValue !== d.value)? 0.4 : 1);
      });

    d3.select("#legend")
      .append("g")
      .attr("transform", `translate(${step}, 0)`)
      .attr("height", this.height)
      .attr("width", step)
      .call(legendAxis)
  }

  private clearPlot() {
    d3.select("#plot")
      .selectAll("*")
      .remove();
  }

  private clearLegend() {
    d3.select("#legend")
      .selectAll("*")
      .remove();
  }

}
