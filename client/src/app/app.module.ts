import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';

import { ExpressionValidatorDirective } from './validators/expression-validator/expression-validator.directive';
import { CheckboxComponent } from './basic-components/checkbox/checkbox.component';
import { AppComponent } from './app.component';
import { NumericInputComponent } from './basic-components/numeric-input/numeric-input.component';
import { ExpressionInputComponent } from './basic-components/expression-input/expression-input.component';
import { MatrixInputComponent } from './basic-components/matrix-input/matrix-input.component';
import { ChartComponent } from './basic-components/chart/chart.component';
import { KnobInputComponent } from './basic-components/knob-input/knob-input.component';
import { ExpressionPrinterComponent } from './basic-components/expression-printer/expression-printer.component';
import { ContourPlotComponent } from './basic-components/contour-plot/contour-plot.component';
import { ParagraphComponent } from './basic-components/paragraph/paragraph.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { ElectricVehicleComponent } from './complex-components/electric-vehicle/electric-vehicle.component';
import { ParagraphGroupComponent } from './basic-components/paragraph-group/paragraph-group.component';
import { MotorEfficiencyComponent } from './complex-components/motor-efficiency/motor-efficiency.component';
import { AppRoutingModule } from './app-routing.module';
import { TableOfContentsComponent } from './basic-components/table-of-contents/table-of-contents.component';
import { ScrollSpyDirective } from './directives/scroll-spy/scroll-spy.directive';
import { SvgComponent } from './basic-components/svg/svg.component';
import { TableOfContentsGroupComponent } from './basic-components/table-of-contents/table-of-contents-group.component';
import { AlertComponent } from './alert/alert.component';
import { MotorSizingComponent } from './complex-components/motor-sizing/motor-sizing.component';
import { VehicleComponent } from './complex-components/vehicle/vehicle.component';
import { BasicEnvelopeComponent } from './complex-components/basic-envelope/basic-envelope.component';
import { StaticAccelPointsComponent } from './complex-components/static-accel-points/static-accel-points.component';
import { DataTableComponent } from './basic-components/data-table/data-table.component';
import { HeatmapComponent } from './basic-components/heatmap/heatmap.component';
import { PointConditionComponent } from './basic-components/point-condition/point-condition.component';
import { PointConditionModalComponent } from './basic-components/point-condition/point-condition-modal.component';
import { SwitchComponent } from './basic-components/switch/switch.component';
import { ExamplesComponent } from './pages/examples/examples.component';
import { AccelerationConditionComponent } from './basic-components/acceleration-condition/acceleration-condition.component';
import { AccelerationConditionModalComponent } from './basic-components/acceleration-condition/acceleration-condition-modal.component';
import { ExportModalComponent } from './services/exporter/export-modal.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DropdownComponent } from './basic-components/dropdown/dropdown.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './shared/user.service';


@NgModule({
  declarations: [
    AppComponent,
    NumericInputComponent,
    ExpressionInputComponent,
    ExpressionValidatorDirective,
    MatrixInputComponent,
    ChartComponent,
    ExpressionPrinterComponent,
    KnobInputComponent,
    ContourPlotComponent,
    CheckboxComponent,
    ParagraphComponent,
    DynamicComponentComponent,
    ElectricVehicleComponent,
    ParagraphGroupComponent,
    MotorEfficiencyComponent,
    SvgComponent,
    TableOfContentsComponent,
    TableOfContentsGroupComponent,
    ScrollSpyDirective,
    AlertComponent,
    MotorSizingComponent,
    VehicleComponent,
    BasicEnvelopeComponent,
    StaticAccelPointsComponent,
    DataTableComponent,
    HeatmapComponent,
    PointConditionComponent,
    PointConditionModalComponent,
    SwitchComponent,
    ExamplesComponent,
    AccelerationConditionComponent,
    AccelerationConditionModalComponent,
    ExportModalComponent,
    NotFoundComponent,
    DropdownComponent,
    UserProfileComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularStickyThingsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true },
    AuthGuard,
    UserService ],
  bootstrap: [AppComponent],
  entryComponents: [
    ParagraphComponent,
    MotorEfficiencyComponent,
    PointConditionModalComponent,
    AccelerationConditionModalComponent,
    ExportModalComponent
  ]
})
export class AppModule { }
