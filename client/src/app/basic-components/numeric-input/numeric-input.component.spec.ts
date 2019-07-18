import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericInputComponent } from './numeric-input.component';
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe('NumericInputComponent', () => {
  let component: NumericInputComponent;
  let fixture: ComponentFixture<NumericInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericInputComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display units dropdown', () => {
    let unitDropdown = fixture.debugElement.query(By.css('#unitDropdown'));

    expect(unitDropdown).toBe(null);

    component.units = ['m', 'km'];

    fixture.detectChanges();

    unitDropdown = fixture.debugElement.query(By.css('#unitDropdown'));

    expect(unitDropdown).toBeTruthy();
  });

  it('should display default unit', () => {
    component.units = ['mm', 'm', 'km'];

    component.unit = 'm';

    fixture.detectChanges();

    let unitDropdown = fixture.debugElement.query(By.css('#unitDropdown'));

    expect(unitDropdown.nativeElement.textContent.trim()).toEqual('m');
  });
});
