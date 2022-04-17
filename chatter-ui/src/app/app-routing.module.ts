import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {HomeViewComponent} from "./home/home-view.component";
import {LoginViewComponent} from "./login/login-view.component";
import {SignupViewComponent} from "./signup/signup-view.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'login',
        component: LoginViewComponent,
      },
      {
        path: 'signup',
        component: SignupViewComponent,
      },
      {
        path: 'home',
        component: HomeViewComponent,
      },
      {path: '**', redirectTo: 'home', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
