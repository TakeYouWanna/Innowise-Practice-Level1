import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FirebaseService } from 'src/app/shared/services/auth/firebase-auth.service'
import { ErrorMessageService } from 'src/app/shared/services/data/error-massage.service'
import { UserDataService } from 'src/app/shared/services/data/user-data.service'

@Component({
  selector: 'registr-window',
  templateUrl: './registr-window.component.html',
  styleUrls: ['./registr-window.component.scss']
})

export class RegistrWindowComponent {
  error$ = this.errorMessageService.error$
  user$ = this.userDataService.user$

  constructor (
    private readonly userDataService: UserDataService,
    private readonly firebaseService: FirebaseService,
    private readonly errorMessageService: ErrorMessageService,
    private readonly router: Router) { }

  ngOnInit (): void {
    this.errorMessageService.setMessage('')
  }

  async onSignUp (email: string, password: string, password2: string): Promise<void> {
    if (password === password2) {
      await this.firebaseService.signUp(email, password)
      if (this.firebaseService.isLoggedIn) {
        await this.router.navigate([''])
      }
    } else { this.errorMessageService.setMessage('Your passwords do not match.') }
  }
}
