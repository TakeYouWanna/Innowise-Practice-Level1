import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { ErrorMessageService } from '../data/error-massage.service'
import { UserDataService } from '../data/user-data.service'

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  isLoggedIn: boolean = false

  constructor (
    private readonly firebaseAuth: AngularFireAuth,
    private readonly userDataService: UserDataService,
    private readonly errorMessageService: ErrorMessageService) { }

  async signIn (email: string, password: string): Promise<void> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(resolve => {
        this.isLoggedIn = true
        const user = JSON.stringify(resolve.user)
        this.userDataService.setUser(user)
        localStorage.setItem('user', user)
      })
      .catch((error) => {
        this.errorMessageService.setMessage(error.message)
      })
  }

  async signUp (email: string, password: string): Promise<void> {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(resolve => {
        this.isLoggedIn = true
        const user = JSON.stringify(resolve.user)
        this.userDataService.setUser(user)
        localStorage.setItem('user', user)
      })
      .catch((error) => {
        this.errorMessageService.setMessage(error.message)
      })
  }

  async logOut (): Promise<void> {
    await this.firebaseAuth.signOut()
      .then(() => {
        this.isLoggedIn = false
        this.userDataService.deleteUser()
        this.errorMessageService.setMessage('')
        localStorage.removeItem('user')
      })
      .catch((error) => {
        this.errorMessageService.setMessage(error.message)
      })
  }
}
