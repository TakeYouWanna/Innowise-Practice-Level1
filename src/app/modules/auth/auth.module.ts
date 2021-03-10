import { NgModule } from '@angular/core';
import { AuthRouterModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [AuthRouterModule, ReactiveFormsModule, CommonModule],
  declarations: [LoginPageComponent, RegisterPageComponent],
  providers: []
})
export class AuthModule {}
