import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionPrinterComponent } from './expression-printer.component';
import { FormsModule } from "@angular/forms";

describe('ExpressionPrinterComponent', () => {
  let component: ExpressionPrinterComponent;
  let fixture: ComponentFixture<ExpressionPrinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionPrinterComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionPrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
