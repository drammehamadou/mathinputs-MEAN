import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticAccelPointsComponent } from './static-accel-points.component';

describe('StaticAccelPointsComponent', () => {
  let component: StaticAccelPointsComponent;
  let fixture: ComponentFixture<StaticAccelPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticAccelPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticAccelPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
