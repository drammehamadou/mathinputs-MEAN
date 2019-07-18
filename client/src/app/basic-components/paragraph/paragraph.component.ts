import {
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  SkipSelf,
} from '@angular/core';
import { ParagraphParent } from "../../shared/paragraph-parent.abstract";
import { ParagraphTreeService } from "../../services/paragraph-tree/paragraph-tree.service";
import { ExporterService } from "../../services/exporter/exporter.service";
import { CaeVariable, ComplexComponentAbstract } from "../../shared/complex-component.abstract";
import { DynamicComponentComponent } from "../../dynamic-component/dynamic-component.component";

@Component({
  selector: 'cae-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
  providers: [{ provide: ParagraphParent, useExisting: forwardRef(() => ParagraphComponent) }]
})
export class ParagraphComponent extends ParagraphParent implements OnInit, OnDestroy {

  private static id = 0;

  @Input('title') title: string;
  @Input('isCollapsed') isCollapsed = false;
  @Input('order') order: number = null;
  @Input('variables') variables: Array<CaeVariable> = null;

  @ContentChildren(ComplexComponentAbstract) complexComponents: QueryList<ComplexComponentAbstract>;
  @ContentChildren(DynamicComponentComponent) dynamicComponents: QueryList<DynamicComponentComponent>;

  constructor(@SkipSelf() @Optional() private parent: ParagraphParent,
              private ptService: ParagraphTreeService,
              private exporterService: ExporterService) {
    super();

    if (!this.name) {
      this.name = `paragraph${ParagraphComponent.id++}`;
    }
  }

  ngOnInit() {
    this.prependParentName();
    this.ptService.registerParagraph(this);
  }

  ngOnDestroy() {
    this.ptService.unregisterParagraph(this);
  }

  onExport() {
    this.exporterService.exportParagraph(this);
  }

  onImport(files: Array<File>) {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (e: any) => {
      const json = e.target.result;
      this.exporterService.importParagraph(this, json);
    };
  }

  formatName(): string {
    return this.name
      .replace('_', '[')
      .replace('_', ']')
  }

  private prependParentName() {
    if (this.parent) {
      let parentName = this.parent.name ? this.parent.name + '.' : '';
      this.name = parentName + this.name;
    }
  }

}
