import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  public user$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  public setUser (data: string): void {
    this.user$.next(JSON.parse(data).email)
  }

  public deleteUser (): void {
    this.user$.next('')
  }
}
