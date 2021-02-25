import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  public error$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  setMessage (message: string): void {
    this.error$.next(message)
  }

//   deleteMessage (): void {
//     this.error$.next('')
//   }
}
