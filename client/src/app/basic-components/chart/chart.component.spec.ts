import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { By } from "@angular/platform-browser";

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display units dropdown', () => {
    let yUnitDropdown = fixture.debugElement.query(By.css('#yUnitDropdown'));
    let xUnitDropdown = fixture.debugElement.query(By.css('#xUnitDropdown'));

    expect(yUnitDropdown).toBe(null);
    expect(xUnitDropdown).toBe(null);

    component.yUnits = ['m', 'km'];
    component.xUnits = ['s', 'h'];

    fixture.detectChanges();

    yUnitDropdown = fixture.debugElement.query(By.css('#yUnitDropdown'));
    xUnitDropdown = fixture.debugElement.query(By.css('#xUnitDropdown'));

    expect(yUnitDropdown).toBeTruthy();
    expect(xUnitDropdown).toBeTruthy();
  });

  it('should display default unit', () => {
    component.yUnits = ['ms', 's', 'h'];
    component.xUnits = ['mm', 'm', 'km'];

    component.yUnit = 'h';
    component.onYUnitSelect('h');
    component.xUnit = 'km';
    component.onXUnitSelect('km');

    fixture.detectChanges();

    component.ngOnInit();

    let yUnitDropdown = fixture.debugElement.query(By.css('#yUnitDropdown'));
    let xUnitDropdown = fixture.debugElement.query(By.css('#xUnitDropdown'));

    expect(yUnitDropdown.nativeElement.textContent.trim()).toEqual('h');
    expect(xUnitDropdown.nativeElement.textContent.trim()).toEqual('km');
  });

});
