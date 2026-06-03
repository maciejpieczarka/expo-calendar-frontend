import {
  startOfMonth,
  startOfWeek,
  addDays,
  subMonths,
  addMonths
} from 'date-fns';

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
}
