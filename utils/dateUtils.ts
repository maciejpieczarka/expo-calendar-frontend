import {
  addDays,
  addMonths,
  endOfMonth,
  startOfMonth,
  startOfWeek
} from 'date-fns';

export function numberToMonth(monthNumber: number): string {
  switch (monthNumber) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return 'January';
  }
}
export function generateGrid(baseDate: Date): Date[] {
  let days: Date[] = [];

  const firstDayOfMonth = startOfMonth(baseDate);
  const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

  for (let i = 0; i < 42; i++) {
    days.push(addDays(startDate, i));
  }

  return days;
}

export function getNextMonth(
  currentDate: Date,
  monthsAmount: number = 1
): Date {
  return addMonths(currentDate, monthsAmount);
}
