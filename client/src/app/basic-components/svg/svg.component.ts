import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as d3 from "d3";
import { svg } from "d3-fetch";
import { Observable } from "rxjs";

@Component({
  selector: 'cae-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {

  @ViewChild('svg') svg: ElementRef;

  @Input('path') path: string;
  @Input('events') events: Observable<[string, boolean]>;

  @Output('elementClicked') elementClicked: EventEmitter<string> = new EventEmitter();

  private element = null;

  constructor() { }

  ngOnInit() {
    this.loadSVG();
  }

  private loadSVG() {
    svg(this.path)
      .then(document => {
        this.svg.nativeElement.append(document.documentElement);

        this.element = d3.select("#vehicle");

        this.events && this.observeEvents();
        this.bindClickEvents();
      });
  }

  private observeEvents() {
    this.events.subscribe(event => {
      const id = event[0];
      const show = event[1];

      this.element.select(`#${id}`)
        .attr('opacity', show? '1' : '0');
    });
  }

  private bindClickEvents() {
    const _class = this;

    this.element.selectAll('*')
      .each(function(d, i) {
        if (!this.getAttribute("cae:click")) return;
        _class.bindClickEvent(this);
      });
  }

  private bindClickEvent(e: any) {
    d3.select(e)
      .on('click', _ => {
        const p = e.parentElement;
        if (e.getAttribute('opacity') == 0 || p.getAttribute('opacity') == 0) {
          return;// not setVisible, then not valid to produce event
        }

        this.elementClicked.emit(e.id);
      });
  }

}
