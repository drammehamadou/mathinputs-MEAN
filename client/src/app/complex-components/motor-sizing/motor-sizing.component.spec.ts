import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorSizingComponent } from './motor-sizing.component';

describe('MotorSizingComponent', () => {
  let component: MotorSizingComponent;
  let fixture: ComponentFixture<MotorSizingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorSizingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorSizingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
