import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginWindowComponent } from './modules/login-window/login-window.component'
import { RegistrWindowComponent } from './modules/registr-window/registr-window.component'

const routes: Routes = [
  { path: 'authorization', component: LoginWindowComponent },
  { path: 'registration', component: RegistrWindowComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
