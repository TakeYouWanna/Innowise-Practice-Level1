import { NgModule } from '@angular/core'
import { AuthRouterModule } from './auth-routing.module'
import { LoginWindowComponent } from './login-window/login-window.component'
import { RegistrWindowComponent } from './registr-window/registr-window.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [AuthRouterModule, ReactiveFormsModule, CommonModule],
  declarations: [LoginWindowComponent, RegistrWindowComponent],
  providers: []
})
export class AuthModule {}
