import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User } from '../../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public user$: BehaviorSubject<User> = new BehaviorSubject<User>({
    uid: '',
    email: ''
  })

  constructor () {
    const user = localStorage.getItem('user')
    if (user != null) {
      this.user$.next(JSON.parse(user))
    }
  }

  public setUser (user: User): void {
    this.user$.next(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  public deleteuser (): void {
    this.user$.next({ uid: '', email: '' })
    localStorage.removeItem('user')
  }
}
