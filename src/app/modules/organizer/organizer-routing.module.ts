import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CalendarComponent } from './calendar/calendar.component'
import { TaskComponent } from './task.component.ts/task.component'

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CalendarComponent },
      { path: 'taskManager/:id', component: TaskComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule {}
