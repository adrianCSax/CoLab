import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabComponent } from './lab/lab.component';
import { MenuComponent } from './menu/menu.component';
import { SigninComponent } from './auth/signin/signin.component';
import { StartLoginComponent } from './auth/start-login/start-login.component';
import { AuthGuard } from './auth/auth.guards';

const routes: Routes = [
  { path: '', component: StartLoginComponent },
  { path: 'signIn', component: SigninComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'lab/:id', component: LabComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
