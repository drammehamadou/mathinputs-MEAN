import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'cae-acceleration-condition-modal',
  templateUrl: './acceleration-condition-modal.component.html',
  styleUrls: ['./acceleration-condition-modal.component.scss']
})
export class AccelerationConditionModalComponent implements OnInit {

  index: string;
  title: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
