import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphGroupComponent } from './paragraph-group.component';
import { ParagraphComponent } from "../paragraph/paragraph.component";
import { DynamicComponentComponent } from "../../dynamic-component/dynamic-component.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

describe('ParagraphGroupComponent', () => {
  let component: ParagraphGroupComponent;
  let fixture: ComponentFixture<ParagraphGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ParagraphGroupComponent,
        ParagraphComponent,
        DynamicComponentComponent
      ],
      imports: [ NgbModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
