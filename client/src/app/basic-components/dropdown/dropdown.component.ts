import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cae-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  private static id = 0;

  @Input('value') value: string | number;
  @Input('values') values: Array<string | number> = [];

  @Output('valueChange') valueChange: EventEmitter<string | number> = new EventEmitter();

  private readonly dropdownId: string = `dropdown-${DropdownComponent.id++}`;

  constructor() {
    ++DropdownComponent.id;
  }

  ngOnInit() {
  }

  selectValue(value: string | number) {
    this.valueChange.emit(value);
  }
}
