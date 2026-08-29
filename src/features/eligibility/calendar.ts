import { waitCalendarSummary } from './messages.ts'

function calendarTimestamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

export function buildReminderCalendar(nextEligibleDate: string, createdAt = new Date()): string {
  const compactDate = nextEligibleDate.replaceAll('-', '')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lafiya//Eligibility//FR',
    'BEGIN:VEVENT',
    `UID:lafiya-don-${compactDate}@lafiya`,
    `DTSTAMP:${calendarTimestamp(createdAt)}`,
    `DTSTART;VALUE=DATE:${compactDate}`,
    `SUMMARY:${waitCalendarSummary(nextEligibleDate)}`,
    'DESCRIPTION:Rappel indicatif. L’équipe de collecte vérifiera votre situation avant le don.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}
