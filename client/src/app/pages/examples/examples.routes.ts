import { Routes } from '@angular/router';
import { ElectricVehicleComponent } from '../../complex-components/electric-vehicle/electric-vehicle.component';
import { MotorSizingComponent } from '../../complex-components/motor-sizing/motor-sizing.component';
import { StaticAccelPointsComponent } from '../../complex-components/static-accel-points/static-accel-points.component';

export const examplesRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'electric-vehicle'
  },
  {
    path: 'electric-vehicle',
    component: ElectricVehicleComponent,
    data: { title: 'Electric Vehicle' }
  },
  {
    path: 'motor-sizing',
    component: MotorSizingComponent,
    data: { title: 'Motor Sizing' }
  },
  {
    path: 'static-and-acceleration-points',
    component: StaticAccelPointsComponent,
    data: { title: 'Static and Acceleration Points' }
  }
];
