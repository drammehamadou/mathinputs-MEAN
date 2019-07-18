import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cae-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input("value") value: boolean = true;
  @Output("valueChange") valueChange: EventEmitter<boolean> = new EventEmitter();

  @Input("onLabel") onLabel: string = "ON";
  @Input("offLabel") offLabel: string = "OFF";

  constructor() { }

  ngOnInit() {
  }

  changeValue() {
    this.value = !this.value;
    this.valueChange.emit(this.value);
  }

}
