import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'cae-point-condition-modal',
  templateUrl: './point-condition-modal.component.html',
  styleUrls: ['./point-condition-modal.component.scss']
})
export class PointConditionModalComponent implements OnInit {

  index: string;
  title: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
