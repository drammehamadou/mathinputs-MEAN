import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccelerationConditionComponent } from './acceleration-condition.component';

describe('AccelerationConditionComponent', () => {
  let component: AccelerationConditionComponent;
  let fixture: ComponentFixture<AccelerationConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccelerationConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccelerationConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
