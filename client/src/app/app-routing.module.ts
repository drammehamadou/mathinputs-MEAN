import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamplesComponent } from './pages/examples/examples.component';
import { examplesRoutes } from './pages/examples/examples.routes';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {UserComponent} from './user/user.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'examples' },
  { path: 'examples', component: ExamplesComponent, data: { title: 'Examples' }, children: examplesRoutes },
  // { path: '404', component: NotFoundComponent },
  // { path: '**', redirectTo: '404' },
  { path: 'signup', component: UserComponent, children: [{ path: '', component: SignUpComponent }] },
  { path: 'login', component: UserComponent, children: [{ path: '', component: SignInComponent }] },
  { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { anchorScrolling: 'enabled' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
