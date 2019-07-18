import { Input } from "@angular/core";

export abstract class ConditionComponentAbstract {

  @Input('passed') passed: boolean = false;
  @Input('index') index: string;
  @Input('title') title: string;

}
