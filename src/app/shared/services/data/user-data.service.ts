import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../interfaces/user';
import { LocalStorageKeys } from '../../constants/local-storage-keys.constant';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public user$: BehaviorSubject<User> = new BehaviorSubject<User>({
    uid: '',
    email: ''
  });

  constructor() {
    this.user$.next(
      JSON.parse(localStorage.getItem(LocalStorageKeys.User)) || ''
    );
  }

  public setUser(user: User): void {
    this.user$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public deleteUser(): void {
    this.user$.next({ uid: '', email: '' });
    localStorage.removeItem('user');
  }
}
