import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Task } from 'src/app/shared/interfaces/task'
import { TaskDataService } from 'src/app/shared/services/data/task-data.service'
import { UserDataService } from 'src/app/shared/services/data/user-data.service'
import { FirebaseFirestoreService } from 'src/app/shared/services/firebase/firebase-firestore.service'

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskManagerComponent implements OnInit {
  public taskForm!: FormGroup
  public method: string = 'Task Additing'
  public additing: boolean = true
  private user = this.userDataService.user$
  private id: string = ''
  public task: Task = {
    name: '',
    description: '',
    status: false,
    date: new Date()
  }

  @ViewChild('taskDateRef')
  private readonly taskDateRef!: ElementRef<HTMLInputElement>

  constructor (
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private firebaseFirestore: FirebaseFirestoreService,
    private userDataService: UserDataService,
    private taskDataService: TaskDataService
  ) {}

  public ngOnInit (): void {
    this.taskForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      date: [null, [Validators.required]],
      status: [null]
    })
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id
      if (this.id !== '') {
        this.task = this.taskDataService.tasks[params.id]
        this.additing = false
        this.method = 'Task Updating'
      }
    })
    this.taskForm.patchValue(this.task)
  }

  public ngAfterViewInit (): void {
    const today = new Date().toISOString().slice(0, 10)
    this.taskDateRef.nativeElement.setAttribute('min', today)
    this.taskDateRef.nativeElement.value = new Date(this.task.date)
      .toISOString()
      .slice(0, 10)
  }

  public getData (): void {
    this.task = this.taskForm.value
    this.task.date = new Date(this.task.date)
    if (this.additing) {
      this.firebaseFirestore
        .addNewTask(this.user.value.uid, this.task)
        .subscribe(
          (data) => {
            this.router.navigate([''])
          },
          (err) => console.log(err)
        )
    } else {
      this.firebaseFirestore
        .updateTask(this.user.value.uid, this.id, this.task)
        .subscribe(() => {
          this.router.navigate([''])
        })
    }
  }
}
