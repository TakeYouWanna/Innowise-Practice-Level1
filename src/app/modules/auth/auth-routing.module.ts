import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginWindowComponent } from './login-window/login-window.component'
import { RegistrWindowComponent } from './registr-window/registr-window.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LoginWindowComponent },
      { path: 'registration', component: RegistrWindowComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRouterModule {}
