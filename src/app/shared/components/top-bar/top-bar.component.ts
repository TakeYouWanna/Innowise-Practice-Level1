import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import { TaskDataService } from '../../services/data/task-data.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  public user$ = this.userDataService.user$;

  constructor(
    private fireBaseAuthService: FirebaseAuthService,
    private userDataService: UserDataService,
    private taskDataService: TaskDataService
  ) {}

  public logOut(): void {
    this.fireBaseAuthService.logOut();
    this.taskDataService.deleteTasks();
    this.userDataService.deleteUser();
  }
}
