import { describe, expect, it } from 'vitest'
import { buildReminderCalendar } from './calendar.ts'

describe('rappel calendrier', () => {
  it('sépare la date de création de la date cible', () => {
    const calendar = buildReminderCalendar(
      '2026-10-01',
      new Date('2026-08-29T07:15:30.000Z'),
    )
    expect(calendar).toContain('DTSTAMP:20260829T071530Z')
    expect(calendar).toContain('DTSTART;VALUE=DATE:20261001')
    expect(calendar).not.toContain('DTSTAMP:20261001')
  })
})
