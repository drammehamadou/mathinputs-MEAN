import { Input } from "@angular/core";

export abstract class ParagraphParent {
  @Input('name') name: string = null;
}
