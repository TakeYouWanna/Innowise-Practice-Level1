import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import { passwordMatch } from './password-match.validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {
  public registerForm: FormGroup;
  public user$ = this.userDataService.user$;
  public error = '';

  constructor(
    private userDataService: UserDataService,
    private firebaseAuthService: FirebaseAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        passConfirm: [null, [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: passwordMatch
      }
    );
  }

  public onSubmit(): void {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    this.firebaseAuthService.signUp(email, password).subscribe(
      (data) => {
        this.userDataService.setUser(data);
        this.router.navigate(['']);
      },
      (err) => {
        this.error = err.message;
        this.registerForm.reset();
        this.changeDetectorRef.detectChanges();
      }
    );
  }
}
