import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PatientComponent} from './patient/patient.component';
import {DoctorComponent} from './doctor/doctor.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'doctor',
    component: DoctorComponent
  },
  {
    path: 'patient',
    component: PatientComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
