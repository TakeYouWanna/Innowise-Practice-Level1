import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})

export class FirebaseeService {
  isLoggedIn: boolean = false

  constructor (public firebaseAuth: AngularFireAuth) { }

  async signIn (email: string, password: string): Promise<void> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(resolve => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(resolve.user))
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  async signUp (email: string, password: string): Promise<void> {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(resolve => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(resolve.user))
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  async logOut (): Promise<void> {
    await this.firebaseAuth.signOut()
      .then(() => {
        localStorage.removeItem('user')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
}
