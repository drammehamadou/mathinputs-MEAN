import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionInputComponent } from './expression-input.component';
import { FormsModule } from "@angular/forms";

describe('ExpressionInputComponent', () => {
  let component: ExpressionInputComponent;
  let fixture: ComponentFixture<ExpressionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionInputComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
