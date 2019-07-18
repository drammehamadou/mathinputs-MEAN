import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cae-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  private static id: number = 0;
  private readonly checkboxId: string = `checkbox-${CheckboxComponent.id++}`;

  @Input("title") title: string;
  @Input("value") value: boolean = false;

  @Output("valueChange") valueChange = new EventEmitter<boolean>();

  constructor() {
    ++CheckboxComponent.id;
  }

  ngOnInit() {
  }

  onChange() {
    this.valueChange.emit(this.value);
  }

}
