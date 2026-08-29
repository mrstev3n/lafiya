import { describe, expect, it } from 'vitest'
import {
  addCalendarMonths,
  answersFromLastDonation,
  DEFAULT_INTERVAL_CATEGORY,
  evaluateAgeRequirement,
  evaluateEligibility,
  parseAge,
  parseLastDonationDate,
  parseWeightKg,
  todayIso,
  type EligibilityAnswers,
} from './eligibility.ts'

const today = '2026-08-28'

function answers(overrides: Partial<EligibilityAnswers> = {}): EligibilityAnswers {
  return {
    age: 25,
    weightKg: 62,
    intervalCategory: DEFAULT_INTERVAL_CATEGORY,
    hasDonatedBefore: false,
    lastDonationDate: null,
    dateKnown: false,
    ...overrides,
  }
}

describe('saisie des repères', () => {
  it('accepte des âges entiers et des poids décimaux', () => {
    expect(parseAge(' 65 ')).toEqual({ ok: true, value: 65 })
    expect(parseWeightKg('62,5')).toEqual({ ok: true, value: 62.5 })
  })

  it('rejette les valeurs absentes ou non plausibles', () => {
    expect(parseAge('').ok).toBe(false)
    expect(parseAge('18,5').ok).toBe(false)
    expect(parseWeightKg('62kg').ok).toBe(false)
  })

  it('valide uniquement une date réelle, non future', () => {
    expect(parseLastDonationDate('2024-02-29', today).ok).toBe(true)
    expect(parseLastDonationDate('2025-02-29', today).ok).toBe(false)
    expect(parseLastDonationDate('2026-08-29', today).ok).toBe(false)
  })
})

describe('calcul calendaire', () => {
  it('ajoute des mois sans déborder des mois courts', () => {
    expect(addCalendarMonths('2026-01-31', 1)).toBe('2026-02-28')
    expect(addCalendarMonths('2024-02-29', 12)).toBe('2025-02-28')
  })

  it('formate la date locale sans décalage UTC', () => {
    expect(todayIso(new Date(2026, 7, 28, 23, 30))).toBe('2026-08-28')
  })
})

describe('orientation', () => {
  it('indique le nombre approximatif d’années avant 18 ans', () => {
    const result = evaluateAgeRequirement(15, { today })
    expect(result?.status).toBe('criterion_not_met')
    expect(result?.minorWaitYears).toBe(3)
    expect(result?.reasonCodes).toEqual(['age_below_minimum'])
  })

  it('accepte les bornes d’âge et de poids', () => {
    expect(evaluateEligibility(answers({ age: 18, weightKg: 50 }), { today }).status).toBe('can_consider')
    expect(evaluateEligibility(answers({ age: 65 }), { today }).status).toBe('can_consider')
    expect(evaluateEligibility(answers({ age: 66 }), { today }).reasonCodes).toContain('age_above_maximum')
    expect(evaluateEligibility(answers({ weightKg: 49.9 }), { today }).reasonCodes).toContain('weight_below_minimum')
  })

  it('oriente un premier don vers les points de don', () => {
    const result = evaluateEligibility(
      answers({ ...answersFromLastDonation('never', null) }),
      { today },
    )
    expect(result.status).toBe('can_consider')
    expect(result.nextAction).toBe('locations')
  })

  it('reste prudent lorsque la date du dernier don est inconnue', () => {
    const result = evaluateEligibility(
      answers({ ...answersFromLastDonation('unknown', null) }),
      { today },
    )
    expect(result.status).toBe('uncertain')
    expect(result.nextAction).toBe('professional')
  })

  it('donne la prochaine date selon quatre mois calendaires', () => {
    const wait = evaluateEligibility(
      answers({ ...answersFromLastDonation('known', '2026-04-28') }),
      { today: '2026-08-27' },
    )
    const ready = evaluateEligibility(
      answers({ ...answersFromLastDonation('known', '2026-04-28') }),
      { today: '2026-08-28' },
    )
    expect(wait.nextEligibleDate).toBe('2026-08-28')
    expect(wait.status).toBe('wait')
    expect(ready.status).toBe('can_consider')
  })

  it('ne formule aucune garantie médicale dans le résultat', () => {
    const result = evaluateEligibility(answers(), { today })
    expect(JSON.stringify(result)).not.toMatch(/médicalement éligible|vous êtes éligible/i)
  })
})
