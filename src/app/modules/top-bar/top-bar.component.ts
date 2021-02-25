import { Component, OnInit } from '@angular/core'
import { FirebaseService } from 'src/app/shared/services/auth/firebase-auth.service'
import { UserDataService } from 'src/app/shared/services/data/user-data.service'

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})

export class TopBarComponent implements OnInit {
  user$ = this.userDataService.user$
  constructor (
    private readonly fireBaseService: FirebaseService,
    private readonly userDataService: UserDataService
  ) { }

  ngOnInit (): void {
    const user = localStorage.getItem('user')
    if (user != null) {
      this.userDataService.setUser(user)
    }
  }

  logOut (): void {
    // eslint-disable-next-line no-void
    void this.fireBaseService.logOut()
  }
}
