import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core'
import { Task } from 'src/app/shared/interfaces/task'
import { TaskDataService } from 'src/app/shared/services/data/task-data.service'
import { UserDataService } from 'src/app/shared/services/data/user-data.service'
import { FirebaseFirestoreService } from 'src/app/shared/services/firebase/firebase-firestore.service'
import { DateService } from '../../../shared/services/date/date.service'

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit, OnInit {
  public tasksMap = this.taskDataService.tasksMap
  public currentTasks!: { [x: string]: any }
  public days: Date[]
  public currentDay!: Date
  public user$ = this.userDataService.user$

  @ViewChild('scrollWrapperRef')
  private readonly scrollWrapperRef!: ElementRef<HTMLDivElement>

  constructor (
    private dateService: DateService,
    private userDataService: UserDataService,
    private firebaseFirestore: FirebaseFirestoreService,
    private taskDataService: TaskDataService
  ) {
    this.days = this.dateService.getMonth()
  }

  public ngOnInit (): void {
    this.getTasks()
  }

  public ngAfterViewInit (): void {
    const scrollElement = this.scrollWrapperRef.nativeElement
    scrollElement.addEventListener('scroll', () => {
      if (
        scrollElement?.scrollLeft >=
        scrollElement?.scrollWidth - scrollElement?.clientWidth - 100
      ) {
        this.days.push(...this.dateService.getNextMonth())
        this.getTasks()
      }
    })
  }

  private getTasks (): void {
    if (this.user$.value.uid !== '') {
      this.firebaseFirestore
        .getTasks(this.user$.value.uid, this.dateService.getLastDay())
        .subscribe((data) => {
          this.taskDataService.setTasks(data)
          this.days.forEach((day) => this.taskDataService.setTaskToMap(day))
        })
    }
  }

  public showTasks (day: Date): void {
    this.currentDay = day
    this.currentTasks = this.taskDataService.getCurrentTasks(day)
  }

  public deleteTask (taskId: string): void {
    this.firebaseFirestore
      .deleteTask(this.user$.value.uid, taskId)
      .subscribe(() => {
        delete this.currentTasks[taskId]
        this.taskDataService.deleteTask(taskId)
        this.taskDataService.setTaskToMap(this.currentDay)
      })
  }

  public changeStatus (taskId: string, task: Task): void {
    task.status ? (task.status = false) : (task.status = true)
    this.firebaseFirestore
      .updateTask(this.user$.value.uid, taskId, task)
      .subscribe()
  }

  public checkActive (element: Task, index: number, array: Task[]): boolean {
    return !element.status
  }

  public checkCompleted (element: Task, index: number, array: Task[]): boolean {
    return element.status
  }

  public trackByDays (index: number, item: Date): number {
    return index
  }
}
