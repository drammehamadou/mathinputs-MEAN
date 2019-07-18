import {
  Component,
  ComponentFactoryResolver,
  ComponentRef, EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges, ViewChild, ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'cae-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('dynamic', {read: ViewContainerRef}) dynamicOutlet: ViewContainerRef;

  @Input('component') component: any;
  @Input('params') params: Array<[string, any]> = [];

  componentRef: ComponentRef<any> = null;

  private domElement = null;

  private onDestroyCallback: (any) => void = null;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const component: SimpleChange = changes.component;
    const params: SimpleChange = changes.params;

    if (component) {
      this.handleComponentChange(component);
    }

    if (params && params.currentValue && !params.firstChange) {
      this.bindParams();
    }
  }

  ngOnDestroy() {
    this.onDestroyCallback(this.componentRef.instance);
  }

  private handleComponentChange(component: SimpleChange) {
    if (!component.currentValue) {
      if (this.domElement) {
        this.clearElement();
      }

      return;
    } else {
      this.attachComponent(component.currentValue);
    }
  }

  private attachComponent(component: any) {
    let componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(component);

    this.dynamicOutlet.clear();

    this.componentRef = this.dynamicOutlet.createComponent(componentFactory);

    this.bindParams();
  }

  private bindParams() {
    if (!this.componentRef || !this.params) return;

    this.params.forEach(param => {
      if (param[0] == "onBind") {
        param[1](this.componentRef.instance);
        return;
      }

      if (param[0] == "onDestroy") {
        this.onDestroyCallback = param[1];
        return;
      }

      if (this.componentRef.instance[param[0]] instanceof EventEmitter) {
        (this.componentRef.instance[param[0]] as EventEmitter<any>)
          .subscribe(event => param[1](event, this.componentRef.instance) );
      } else {
        this.componentRef.instance[param[0]] = param[1];
      }
    });
  }

  private clearElement() {
    this.componentRef = null;
    this.dynamicOutlet.clear();
  }

}
