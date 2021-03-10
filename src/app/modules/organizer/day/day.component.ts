import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  DoCheck
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/task';
import { TaskDataService } from 'src/app/shared/services/data/task-data.service';

@Component({
  selector: 'calendar-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayComponent implements DoCheck {
  @Input()
  public day: Date;

  @Input()
  public currentDay: Date;

  @Input()
  public tasks: Task[];

  @Output()
  onClick = new EventEmitter<Date>();

  public taskMap = this.taskDataService.tasksMap;
  public active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public completed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private taskDataService: TaskDataService) {}

  public ngDoCheck(): void {
    this.active.next(
      this.taskMap.get(this.day)?.some((task: Task) => !task.status)
    );
    this.completed.next(
      this.taskMap.get(this.day)?.some((task: Task) => task.status)
    );
  }
}
