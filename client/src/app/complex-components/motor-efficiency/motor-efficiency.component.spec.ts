import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorEfficiencyComponent } from './motor-efficiency.component';
import { KnobInputComponent } from "../../basic-components/knob-input/knob-input.component";
import { NumericInputComponent } from "../../basic-components/numeric-input/numeric-input.component";
import { MatrixInputComponent } from "../../basic-components/matrix-input/matrix-input.component";
import { FormsModule } from "@angular/forms";

describe('MotorEfficiencyComponent', () => {
  let component: MotorEfficiencyComponent;
  let fixture: ComponentFixture<MotorEfficiencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MotorEfficiencyComponent,
        KnobInputComponent,
        NumericInputComponent,
        MatrixInputComponent
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorEfficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
