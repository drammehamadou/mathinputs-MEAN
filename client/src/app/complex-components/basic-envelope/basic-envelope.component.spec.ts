import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicEnvelopeComponent } from './basic-envelope.component';

describe('BasicEnvelopeComponent', () => {
  let component: BasicEnvelopeComponent;
  let fixture: ComponentFixture<BasicEnvelopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicEnvelopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicEnvelopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
