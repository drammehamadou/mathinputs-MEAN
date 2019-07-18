import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ExpressionInputComponent } from "./basic-components/expression-input/expression-input.component";
import { ChartComponent } from "./basic-components/chart/chart.component";
import { MatrixInputComponent } from "./basic-components/matrix-input/matrix-input.component";
import { NumericInputComponent } from "./basic-components/numeric-input/numeric-input.component";
import { FormsModule } from "@angular/forms";
import { KnobInputComponent } from "./basic-components/knob-input/knob-input.component";
import { ExpressionPrinterComponent } from "./basic-components/expression-printer/expression-printer.component";
import { ContourPlotComponent } from "./basic-components/contour-plot/contour-plot.component";
import { ElectricVehicleComponent } from "./complex-components/electric-vehicle/electric-vehicle.component";
import { ParagraphComponent } from "./basic-components/paragraph/paragraph.component";
import { ParagraphGroupComponent } from "./basic-components/paragraph-group/paragraph-group.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DynamicComponentComponent } from "./dynamic-component/dynamic-component.component";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ExpressionInputComponent,
        ChartComponent,
        MatrixInputComponent,
        NumericInputComponent,
        KnobInputComponent,
        ExpressionPrinterComponent,
        ContourPlotComponent,
        ElectricVehicleComponent,
        ParagraphComponent,
        ParagraphGroupComponent,
        DynamicComponentComponent
      ],
      imports: [
        FormsModule,
        NgbModule
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
