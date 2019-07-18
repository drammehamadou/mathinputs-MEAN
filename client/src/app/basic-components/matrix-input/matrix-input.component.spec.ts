import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixInputComponent } from './matrix-input.component';
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

describe('MatrixInputComponent', () => {
  let component: MatrixInputComponent;
  let fixture: ComponentFixture<MatrixInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixInputComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display different number of rows', () => {
    let rows;

    component.values = [ [0] ];
    component.ngOnInit();

    fixture.detectChanges();

    rows = fixture.debugElement.queryAll(By.css('#matrix-row'));
    expect(rows.length).toEqual(1);

    component.values = [ [0], [0], [0], [0], [0], [0], [0], [0] ];
    component.ngOnInit();

    fixture.detectChanges();

    rows = fixture.debugElement.queryAll(By.css('#matrix-row'));
    expect(rows.length).toEqual(8);

    component.values = [ [0], [0], [0], [0], [0], [0], [0], [0], [0], [0] ];
    component.ngOnInit();

    fixture.detectChanges();

    rows = fixture.debugElement.queryAll(By.css('#matrix-row'));
    expect(rows.length).toEqual(10);
  });

  it('should display different number of cols', () => {
    let cols;

    component.values = [ [0] ];
    component.ngOnInit();

    fixture.detectChanges();

    cols = fixture.debugElement.queryAll(By.css('#matrix-cell'));
    expect(cols.length).toEqual(1);

    component.values = [ [0, 0, 0, 0, 0, 0, 0, 0] ];
    component.ngOnInit();

    fixture.detectChanges();

    cols = fixture.debugElement.queryAll(By.css('#matrix-cell'));
    expect(cols.length).toEqual(8);

    component.values = [ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ];
    component.ngOnInit();

    fixture.detectChanges();

    cols = fixture.debugElement.queryAll(By.css('#matrix-cell'));
    expect(cols.length).toEqual(10);
  });

  it('should not display add row and col buttons', () => {
    component.canAddRow = false;
    component.canAddCol = false;

    fixture.detectChanges();

    const addRows = fixture.debugElement.query(By.css('#matrix-add-row'));
    const addCols = fixture.debugElement.query(By.css('#matrix-add-col'));

    expect(addRows).toBe(null);
    expect(addCols).toBe(null);
  });

  it('should add row on button press', () => {
    const addRows = fixture.debugElement.query(By.css('#matrix-add-row'));
    addRows.nativeElement.click();
    addRows.nativeElement.click();

    fixture.detectChanges();

    let rows = fixture.debugElement.queryAll(By.css('#matrix-row'));
    expect(rows.length).toEqual(3);
  });

  it('should add column on button press', () => {
    const addCols = fixture.debugElement.query(By.css('#matrix-add-col'));
    addCols.nativeElement.click();
    addCols.nativeElement.click();

    fixture.detectChanges();

    let cols = fixture.debugElement.queryAll(By.css('#matrix-cell'));
    expect(cols.length).toEqual(3);
  });

  it('should delete row on button press', () => {
    const startValues = [ [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12] ];
    const endValues = [ [1, 2, 3, 4], [9, 10, 11, 12] ];

    component.values = startValues;
    component.ngOnInit();

    fixture.detectChanges();

    const deleteRows = fixture.debugElement.queryAll(By.css('#matrix-delete-row'));
    deleteRows[1].nativeElement.click();

    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('#matrix-row'));

    expect(component.values).toEqual(endValues);
    expect(rows.length).toEqual(endValues.length);
  });

  it('should delete column on button press', () => {
    const startValues = [ [1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12] ];
    const endValues = [ [1, 3, 4], [5, 7, 8], [9, 11, 12] ];

    component.values = startValues;
    component.ngOnInit();

    fixture.detectChanges();

    const deleteColumns = fixture.debugElement.queryAll(By.css('#matrix-delete-col'));
    deleteColumns[1].nativeElement.click();

    fixture.detectChanges();

    const cells = fixture.debugElement.queryAll(By.css('#matrix-cell'));

    expect(component.values).toEqual(endValues);
    expect(cells.length).toEqual(endValues[0].length * endValues.length);
  });

  it('should extend values with zeros if needed', () => {
    const startValues = [ [1], [1, 2], [1, 2, 3, 4], [1, 2, 3] ];
    const endValues = [ [1, 0, 0, 0], [1, 2, 0, 0], [1, 2, 3, 4], [1, 2, 3, 0] ];

    component.values = startValues;
    component.ngOnInit();

    expect(component.values).toEqual(endValues);
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
