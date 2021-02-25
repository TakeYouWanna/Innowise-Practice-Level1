import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ErrorMessageService } from 'src/app/shared/services/data/error-massage.service'
import { UserDataService } from 'src/app/shared/services/data/user-data.service'
import { FirebaseService } from '../../shared/services/auth/firebase-auth.service'

@Component({
  selector: 'login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})

export class LoginWindowComponent implements OnInit {
  error$ = this.errorMessageService.error$
  user$ = this.userDataService.user$

  constructor (
    private readonly firebaseService: FirebaseService,
    private readonly router: Router,
    private readonly errorMessageService: ErrorMessageService,
    private readonly userDataService: UserDataService) { }

  ngOnInit (): void {
    this.errorMessageService.setMessage('')
  }

  async onSignIn (email: string, password: string): Promise<void> {
    await this.firebaseService.signIn(email, password)
    if (this.firebaseService.isLoggedIn) {
      await this.router.navigate([''])
    }
  }
}
