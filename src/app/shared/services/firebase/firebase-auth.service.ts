import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from '../../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  constructor (private firebaseAuth: AngularFireAuth) {}

  public signIn (email: string, password: string): Observable<User> {
    return from(
      this.firebaseAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      map((response) => {
        const user = response.user
        return {
          uid: user?.uid == null ? '' : user.uid,
          email: user?.email == null ? '' : user.email
        }
      })
    )
  }

  public signUp (email: string, password: string): Observable<User> {
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      map((response) => {
        const user = response.user
        return {
          uid: user?.uid == null ? '' : user.uid,
          email: user?.email == null ? '' : user.email
        }
      })
    )
  }

  public logOut (): void {
    this.firebaseAuth.signOut()
  }
}
