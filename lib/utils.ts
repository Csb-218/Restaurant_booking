import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeDateAndTime(date: Date, time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const mergedDate = new Date(date);
  mergedDate.setHours(hours, minutes, 0, 0);
  return mergedDate.toISOString();
}
