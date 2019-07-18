import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricVehicleComponent } from './electric-vehicle.component';
import { NumericInputComponent } from "../../basic-components/numeric-input/numeric-input.component";
import { ExpressionInputComponent } from "../../basic-components/expression-input/expression-input.component";
import { FormsModule } from "@angular/forms";
import { ParagraphGroupComponent } from "../../basic-components/paragraph-group/paragraph-group.component";
import { ParagraphComponent } from "../../basic-components/paragraph/paragraph.component";
import { DynamicComponentComponent } from "../../dynamic-component/dynamic-component.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

describe('ElectricVehicleComponent', () => {
  let component: ElectricVehicleComponent;
  let fixture: ComponentFixture<ElectricVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ElectricVehicleComponent,
        NumericInputComponent,
        ExpressionInputComponent,
        ParagraphGroupComponent,
        ParagraphComponent,
        DynamicComponentComponent
      ],
      imports: [
        FormsModule,
        NgbModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
