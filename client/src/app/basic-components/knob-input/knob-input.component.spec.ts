import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnobInputComponent } from './knob-input.component';
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

describe('KnobInputComponent', () => {
  let component: KnobInputComponent;
  let fixture: ComponentFixture<KnobInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnobInputComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnobInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display input', () => {
    component.displayInput = false;
    component.ngOnInit();

    fixture.detectChanges();

    let input = fixture.debugElement.query(By.css('#input'));
    expect(input.nativeElement.style.visibility).toEqual('hidden');
  });
});
