import { Injectable } from '@angular/core';
import {
  applyPatch, applyOperation, applyReducer,
  observe, unobserve,
  generate, compare, validate, Operation
} from 'fast-json-patch';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  document: any;
  observer: any;

  constructor() { }

  setDocument(doc: any) {
    if (this.observer) {
      unobserve(this.document, this.observer);
    }
    this.document = doc;
    this.observer = observe(this.document, (patches) => { this.change(patches); });
  }

  change(patches: Operation[]) {

  }
}
