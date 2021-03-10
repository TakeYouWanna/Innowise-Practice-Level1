import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/shared/interfaces/task';
import { TaskDataService } from 'src/app/shared/services/data/task-data.service';
import { UserDataService } from 'src/app/shared/services/data/user-data.service';
import { FirebaseFirestoreService } from 'src/app/shared/services/firebase/firebase-firestore.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskManagerComponent implements OnInit, AfterViewInit {
  public taskForm!: FormGroup;
  public method = 'Adding a Task';
  public addition = true;
  private user = this.userDataService.user$;
  private id = '';
  public task: Task = {
    name: '',
    description: '',
    status: false,
    date: new Date()
  };

  @ViewChild('taskDateRef')
  private taskDateRef!: ElementRef<HTMLInputElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private firebaseFirestore: FirebaseFirestoreService,
    private userDataService: UserDataService,
    private taskDataService: TaskDataService
  ) {}

  public ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      date: [null, [Validators.required]],
      status: [null]
    });
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
      if (this.id !== '') {
        this.task = this.taskDataService.tasks[params.id];
        this.addition = false;
        this.method = 'Editing Task';
      }
    });
    this.taskForm.patchValue(this.task);
  }

  public ngAfterViewInit(): void {
    const today = new Date().toISOString().slice(0, 10);
    this.taskDateRef.nativeElement.setAttribute('min', today);
    this.taskDateRef.nativeElement.value = new Date(this.task.date)
      .toISOString()
      .slice(0, 10);
  }

  public getData(): void {
    this.task = this.taskForm.value;
    this.task.date = new Date(this.task.date);
    if (this.addition) {
      this.firebaseFirestore
        .addNewTask(this.user.value.uid, this.task)
        .subscribe(
          (data) => {
            this.router.navigate(['']);
          },
          (err) => console.log(err)
        );
    } else {
      this.firebaseFirestore
        .updateTask(this.user.value.uid, this.id, this.task)
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }
}
