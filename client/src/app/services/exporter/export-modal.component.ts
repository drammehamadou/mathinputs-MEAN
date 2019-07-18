import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'cae-export-modal',
  template: `
    <div class="modal-header">
    <h4 class="modal-title">Export component</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss(null)">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div class="form-group">
      <span>Export name</span>
      <input class="form-control" [(ngModel)]="name"/>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(null)">Cancel</button>
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(name)">Export</button>
  </div>
  `
})
export class ExportModalComponent {

  @Input('name') name: string;

  constructor(public activeModal: NgbActiveModal) {}

}
