import { Injectable } from '@angular/core'
import { eachDayOfInterval } from 'date-fns'
import { addDays } from 'date-fns/fp'

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private readonly today = new Date()
  private lastDay = addDays(30, this.today)

  public getMonth (): Date[] {
    return eachDayOfInterval({
      start: this.today,
      end: this.lastDay
    })
  }

  public getNextMonth (): Date[] {
    const nextMonth = eachDayOfInterval({
      start: this.lastDay,
      end: addDays(30, this.lastDay)
    })
    this.lastDay = addDays(30, this.lastDay)
    return nextMonth
  }

  public getLastDay (): Date {
    return this.lastDay
  }
}
