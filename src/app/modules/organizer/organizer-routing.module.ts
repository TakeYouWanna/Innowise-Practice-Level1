import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CalendarComponent } from './calendar/calendar.component'
import { TaskManagerComponent } from './task-manager/task.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CalendarComponent },
      { path: 'taskManager/:id', component: TaskManagerComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule {}
