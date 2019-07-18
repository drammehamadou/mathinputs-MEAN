import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointConditionComponent } from './point-condition.component';

describe('PointConditionComponent', () => {
  let component: PointConditionComponent;
  let fixture: ComponentFixture<PointConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
