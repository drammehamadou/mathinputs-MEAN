import { Component, EventEmitter, Input, OnInit, Optional, Output, SkipSelf } from '@angular/core';
import { ParagraphParent } from "../../shared/paragraph-parent.abstract";
import { range } from "../../shared/utils";
import { CaeVariable, ComplexComponentAbstract } from "../../shared/complex-component.abstract";
import { LocalScopeEvent } from "../../shared/local-scope-event";

@Component({
  selector: 'cae-paragraph-group',
  templateUrl: './paragraph-group.component.html',
  styleUrls: ['./paragraph-group.component.scss']
})
export class ParagraphGroupComponent extends ParagraphParent implements OnInit {

  private static id = 0;

  @Input("size") size: number = 0;
  @Input("vertical") vertical: boolean = false;

  @Input("subTitle") subTitle: string = "";

  @Input("component") component: ComplexComponentAbstract;
  @Input("params") params: Array<[string, any]> = [];

  @Output("localScopeChange") localScopeChange = new EventEmitter<LocalScopeEvent>();

  private localVariables: Map<ComplexComponentAbstract, Array<CaeVariable>> = new Map();

  constructor(@SkipSelf() @Optional() private parent: ParagraphParent) {
    super();

    if (!this.name) {
      this.name = `paragraphGroup${ParagraphGroupComponent.id++}`;
    }
  }

  ngOnInit() {
    this.params.push(["onBind", (instance) => this.onInstanceBind(instance)]);
    this.params.push(["onDestroy", (instance) => this.onInstanceDestroy(instance)]);
    this.params.push(["variableChange", _ => this.onVariableChange()]);
  }

  getRange(): Array<number> {
    return range(0, this.size);
  }

  getName(id: number) {
    return `${this.name}_${id}_`;
  }

  getTitle(id: number) {
    return `${this.subTitle} ${id}`;
  }

  private prependParentName(name: string) {
    if (this.parent) {
      let parentName = this.parent.name ? this.parent.name + '.' : '';
      name = parentName + name;
    }

    return name;
  }

  private onInstanceBind(instance: ComplexComponentAbstract) {
    this.localVariables.set(instance, instance.variables);
  }

  private onInstanceDestroy(instance: ComplexComponentAbstract) {
    this.localVariables.delete(instance);
  }

  private onVariableChange() {
    const localScope = Array.from(this.localVariables.values())
      .map(a => a.reduce((acc, curr) => ({ [curr.name]: curr.value, ...acc }), {}));

    this.localScopeChange.emit({ name: this.prependParentName(this.name), scopes: localScope });
  }

}
