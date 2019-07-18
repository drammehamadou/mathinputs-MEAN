import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AccelerationConditionModalComponent } from "./acceleration-condition-modal.component";
import { ConditionComponentAbstract } from "../../shared/condition-component.abstract";

@Component({
  selector: 'cae-acceleration-condition',
  templateUrl: './acceleration-condition.component.html',
  styleUrls: ['./acceleration-condition.component.scss']
})
export class AccelerationConditionComponent extends ConditionComponentAbstract implements OnInit {

  @Input('from') from: number = 0;
  @Input('to') to: number = 0;
  @Input('time') time: number = 0;
  @Input('distance') distance: number = 0;
  @Input('mass') mass: number = 0;

  @Input('massType') massType: string;

  constructor(private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
  }

  openDetails() {
    const modalRef = this.modalService.open(AccelerationConditionModalComponent);
    modalRef.componentInstance.index = this.index;
    modalRef.componentInstance.title = this.title;
  }

}
