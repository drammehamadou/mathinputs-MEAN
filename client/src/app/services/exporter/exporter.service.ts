import { Injectable } from '@angular/core';
import { Node, ParagraphTreeService } from "../paragraph-tree/paragraph-tree.service";
import { ParagraphComponent } from "../../basic-components/paragraph/paragraph.component";
import { ComplexComponentAbstract } from "../../shared/complex-component.abstract";
import { AlertService, AlertTime, AlertType } from "../../alert/alert.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ExportModalComponent } from "./export-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor(private ptService: ParagraphTreeService,
              private alertService: AlertService,
              private modalService: NgbModal) { }

  exportParagraph(paragraph: ParagraphComponent) {
    const paragraphNode = this.ptService.getParagraphTree().find(paragraph);
    if (!paragraphNode) {
      this.alertService.show({ type: AlertType.FAILURE, time: AlertTime.LONG, message: 'Export failed!' });
      return;
    }

    const obj = this.exportNode(paragraphNode);
    const json = JSON.stringify(obj);

    const name = paragraph.title? paragraph.title : paragraphNode.name;
    const modal = this.modalService.open(ExportModalComponent);
    modal.componentInstance.name = name;
    modal.result.then(name => {
        if (!name) return;

        this.saveJSONToFile(json, name);
        this.alertService.show({ type: AlertType.SUCCESS, time: AlertTime.SHORT, message: 'Export successful!' });
      });
  }

  importParagraph(paragraph: ParagraphComponent, json: string) {
    const paragraphNode = this.ptService.getParagraphTree().find(paragraph);
    if (!paragraphNode) {
      this.alertService.show({ type: AlertType.FAILURE, time: AlertTime.LONG, message: 'Import failed!' });
      return;
    }

    const obj = JSON.parse(json);
    this.importNode(paragraphNode, obj);
    this.alertService.show({ type: AlertType.SUCCESS, time: AlertTime.SHORT, message: 'Import successful!' });
  }

  private exportNode(paragraphNode: Node): object {
    const json = {};
    const contentComponents = this.getContentComponents(paragraphNode);

    if (paragraphNode.instance.variables) {
      paragraphNode.instance.variables.forEach(
        v => json[v.name] = { value: v.value, unit: v.unit, description: v.description }
      );
    }

    contentComponents.forEach((cc: ComplexComponentAbstract) => {
      cc.variables && cc.variables.forEach(
        v => json[v.name] = { value: v.value, unit: v.unit, description: v.description }
      );
    });

    if (paragraphNode.children) {
      paragraphNode.children.forEach(c => {
        const name = c.name.replace(`${paragraphNode.name}.`, '');

        if (/_[0-9]*_$/ig.exec(name)) {// is an array
          const arrayName = name.slice(0, name.indexOf('_'));

          if (!json[arrayName]) {
            json[arrayName] = [];
          }

          json[arrayName].push(this.exportNode(c));
        } else {
          json[name] = this.exportNode(c);
        }
      });
    }

    return json;
  }

  private importNode(paragraphNode: Node, data: object) {
    const contentComponents = this.getContentComponents(paragraphNode);

    if (paragraphNode.instance.variables) {
      paragraphNode.instance.variables.forEach(
        v => {
          v.unit = data[v.name].unit;
          v.value = data[v.name].value;
          v.description = data[v.name].description;
        }
      );
    }

    contentComponents.forEach((cc: ComplexComponentAbstract) => {
      cc.variables && cc.variables.forEach(v => {
        v.unit = data[v.name].unit;
        v.value = data[v.name].value;
        v.description = data[v.name].description;
      });
    });

    if (paragraphNode.children) {
      paragraphNode.children.forEach(c => {
        const name = c.name.replace(`${paragraphNode.name}.`, '');

        if (/_[0-9]*_$/ig.exec(name)) {// is an array
          const arrayName = name.slice(0, name.indexOf('_'));
          const index = parseInt(name.replace(arrayName, '').replace(/_/g, ''));

          if (index > data[arrayName].length - 1) {
            return;
          }

          this.importNode(c, data[arrayName][index]);
        } else {
          this.importNode(c, data[name]);
        }
      });
    }
  }

  private getContentComponents(paragraphNode: Node): Array<ComplexComponentAbstract> {
    let contentComponents: Array<any> = [];
    if (paragraphNode.instance.complexComponents.length > 0) {
      contentComponents = contentComponents.concat(paragraphNode.instance.complexComponents.toArray());
    }
    if (paragraphNode.instance.dynamicComponents.length > 0) {
      contentComponents = contentComponents.concat(
        paragraphNode.instance.dynamicComponents
          .map(dc => dc.componentRef.instance)
          .filter(dc => dc instanceof ComplexComponentAbstract)
      );
    }

    return contentComponents;
  }

  private saveJSONToFile(json: string, name: string) {
    const a: HTMLAnchorElement = document.createElement('a');
    const file = new Blob([json], {type: 'text/plain'});
    const fileName = name.replace(/\s/g, '_') + '.json';

    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
}
