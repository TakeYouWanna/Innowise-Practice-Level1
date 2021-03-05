import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service'
import { UserDataService } from 'src/app/shared/services/data/user-data.service'

@Component({
  selector: 'registr-window',
  templateUrl: './registr-window.component.html',
  styleUrls: ['./registr-window.component.scss']
})
export class RegistrWindowComponent {
  public registForm: FormGroup
  public user$ = this.userDataService.user$
  public error: string = ''

  constructor (
    private userDataService: UserDataService,
    private firebaseAuthService: FirebaseAuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      passConfirm: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  public onSubmit (): void {
    const email = this.registForm.value.email
    const password = this.registForm.value.password
    if (password === this.registForm.value.passConfirm) {
      this.firebaseAuthService.signUp(email, password).subscribe(
        (data) => {
          this.userDataService.setUser(data)
          this.router.navigate([''])
        },
        (err) => {
          this.error = err.message
          this.registForm.reset()
        }
      )
    } else {
      this.error = 'Passwords do not match'
    }
  }
}
