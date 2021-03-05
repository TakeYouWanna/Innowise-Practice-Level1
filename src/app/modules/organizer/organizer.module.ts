import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CalendarComponent } from './calendar/calendar.component'
import { OrganizerRoutingModule } from './organizer-routing.module'
import { TaskComponent } from './task.component.ts/task.component'

@NgModule({
  imports: [
    OrganizerRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [CalendarComponent, TaskComponent]
})
export class OrganizerModule {}
