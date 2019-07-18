import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PointConditionModalComponent } from "./point-condition-modal.component";
import { ConditionComponentAbstract } from "../../shared/condition-component.abstract";

@Component({
  selector: 'cae-point-condition',
  templateUrl: './point-condition.component.html',
  styleUrls: ['./point-condition.component.scss']
})
export class PointConditionComponent extends ConditionComponentAbstract implements OnInit {

  @Input('acceleration') acceleration: number = 0;
  @Input('speed') speed: number = 0;
  @Input('gradient') gradient: number = 0;
  @Input('headwind') headwind: number = 0;
  @Input('mass') mass: number = 0;

  @Input('massType') massType: string;

  constructor(private modalService: NgbModal) {
    super();
  }

  ngOnInit() {
  }

  openDetails() {
    const modalRef = this.modalService.open(PointConditionModalComponent);
    modalRef.componentInstance.index = this.index;
    modalRef.componentInstance.title = this.title;
  }

}
