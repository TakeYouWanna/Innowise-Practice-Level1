import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AngularFireModule } from '@angular/fire'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { TopBarComponent } from './modules/top-bar/top-bar.component'
import { LoginWindowComponent } from './modules/login-window/login-window.component'
import { RegistrWindowComponent } from './modules/registr-window/registr-window.component'

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginWindowComponent,
    RegistrWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAsaJIGqvhCaxlUDDmyXqSjKNArwaT6SXM',
      authDomain: 'innowisepracticelevel1.firebaseapp.com',
      projectId: 'innowisepracticelevel1',
      storageBucket: 'innowisepracticelevel1.appspot.com',
      messagingSenderId: '678231746401',
      appId: '1:678231746401:web:9bfd49416d71d73844c720',
      measurementId: 'G-LX1GLSW2SN'
    })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
