import { Component, Input, OnInit } from '@angular/core';

export interface ButtonCell {
  name: string;
  action: ((...args: any[]) => void);
}

@Component({
  selector: 'cae-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input('xLabels') xLabels: Array<string>;
  @Input('yLabels') yLabels: Array<string>;
  @Input('data') data: Array<Array<string | number | ButtonCell>>;

  constructor() { }

  ngOnInit() {
  }

  isButton(cell: any): boolean {
    if (!cell || typeof cell !== 'object')
      return false;

    return this.isButtonCell(cell);
  }

  private isButtonCell(object: any): object is ButtonCell {
    return 'action' in object;
  }

}
