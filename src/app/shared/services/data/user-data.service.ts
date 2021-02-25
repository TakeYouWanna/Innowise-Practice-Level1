import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  public user$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  public setUser (data: any): void {
    this.user$.next(data)
  }

  public deleteUser (): void {
    this.user$.next(null)
  }
}
