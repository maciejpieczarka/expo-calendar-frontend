import {
  startOfMonth,
  startOfWeek,
  addDays,
  subMonths,
  addMonths
} from 'date-fns';
import { CalendarEvent } from '@/features/calendar/calendar.types';

export class CalendarService {
  static generateGrid(baseDate: Date): Date[] {
    let days: Date[] = [];

    const firstDayOfMonth = startOfMonth(baseDate);
    const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 42; i++) {
      days.push(addDays(startDate, i));
    }

    return days;
  }

  static getNextMonth(currentDate: Date, monthsAmount: number = 1): Date {
    return addMonths(currentDate, monthsAmount);
  }

  static async fetchEventsForMonth(
    year: number,
    month: number
  ): Promise<CalendarEvent[]> {
    const promise: Promise<CalendarEvent[]> = new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'Birthday',
            description: 'I love them',
            startDate: new Date(),
            endDate: new Date(),
            ownerId: 1,
            calendarId: 1
          },
          {
            id: 2,
            name: 'Chill day',
            description: 'Only with Hannah <3',
            startDate: new Date('2026-05-1'),
            endDate: new Date('2022-06-25'),
            ownerId: 1,
            calendarId: 1
          }
        ]);
      }, 1000);
    });

    return promise;
  }
}
