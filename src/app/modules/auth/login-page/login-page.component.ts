import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../../shared/services/firebase/firebase-auth.service';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  public user$ = this.userDataService.user$;
  public loginForm: FormGroup;
  public error = '';

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private formBuilder: FormBuilder,
    private userDataService: UserDataService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  public onSubmit(): void {
    this.firebaseAuthService
      .signIn(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (data) => {
          this.userDataService.setUser(data);
          this.router.navigate(['']);
        },
        (err) => {
          this.error = err.message;
          this.loginForm.reset();
        }
      );
  }
}
