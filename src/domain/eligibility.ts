import { isoDateSchema } from './schemas.ts'

export const MIN_AGE = 18
export const MAX_AGE = 65
export const MIN_WEIGHT_KG = 50
export const DEFAULT_INTERVAL_CATEGORY = 'four_months' as const

export const INTERVAL_MONTHS = {
  three_months: 3,
  four_months: 4,
} as const

export type IntervalCategory = keyof typeof INTERVAL_MONTHS
export type LastDonationKind = 'never' | 'known' | 'unknown'
export type EligibilityStatus = 'can_consider' | 'wait' | 'criterion_not_met' | 'uncertain'
export type EligibilityNextAction = 'locations' | 'preparation' | 'professional' | 'criteria'
export type EligibilityReasonCode =
  | 'age_below_minimum'
  | 'age_above_maximum'
  | 'weight_below_minimum'
  | 'interval_not_reached'
  | 'last_donation_unknown'
  | 'criteria_met'
  | 'never_donated_criteria_met'

export type EligibilityAnswers = {
  age: number
  weightKg: number
  intervalCategory: IntervalCategory
  hasDonatedBefore: boolean
  lastDonationDate: string | null
  dateKnown: boolean
}

export type EligibilityResult = {
  status: EligibilityStatus
  reasonCodes: EligibilityReasonCode[]
  nextEligibleDate: string | null
  minorWaitYears: number | null
  medicalDisclaimer: 'medical_eligibility'
  nextAction: EligibilityNextAction
  computedAt: string
}

export type FieldParseSuccess<T> = { ok: true; value: T }
export type FieldParseFailure = { ok: false; error: string }
export type FieldParseResult<T> = FieldParseSuccess<T> | FieldParseFailure

type EvaluationOptions = { today?: string; now?: Date }

function computedAt(options: EvaluationOptions): string {
  return (options.now ?? new Date()).toISOString()
}

function criterionResult(
  reasonCodes: EligibilityReasonCode[],
  options: EvaluationOptions,
  minorWaitYears: number | null = null,
): EligibilityResult {
  return {
    status: 'criterion_not_met',
    reasonCodes,
    nextEligibleDate: null,
    minorWaitYears,
    medicalDisclaimer: 'medical_eligibility',
    nextAction: 'criteria',
    computedAt: computedAt(options),
  }
}

export function todayIso(now = new Date()): string {
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function addCalendarMonths(isoDate: string, months: number): string {
  const parsed = isoDateSchema.safeParse(isoDate)
  if (!parsed.success) throw new Error('Date ISO invalide')

  const [year, month, day] = isoDate.split('-').map(Number)
  const totalMonths = year * 12 + (month - 1) + months
  const nextYear = Math.floor(totalMonths / 12)
  const nextMonthIndex = totalMonths % 12
  const lastDayOfMonth = new Date(Date.UTC(nextYear, nextMonthIndex + 1, 0)).getUTCDate()
  const nextDay = Math.min(day, lastDayOfMonth)
  return `${String(nextYear).padStart(4, '0')}-${String(nextMonthIndex + 1).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`
}

export function formatIsoDateFr(isoDate: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00.000Z`))
}

export function parseAge(raw: string): FieldParseResult<number> {
  const trimmed = raw.trim()
  if (!trimmed) return { ok: false, error: 'Indiquez votre âge en années.' }
  if (!/^\d+$/.test(trimmed)) {
    return { ok: false, error: 'Saisissez votre âge avec un nombre entier, par exemple 25.' }
  }
  const value = Number(trimmed)
  if (value < 1 || value > 120) {
    return { ok: false, error: 'Saisissez un âge compris entre 1 et 120 ans.' }
  }
  return { ok: true, value }
}

export function parseWeightKg(raw: string): FieldParseResult<number> {
  const trimmed = raw.trim().replace(',', '.')
  if (!trimmed) return { ok: false, error: 'Indiquez votre poids en kilogrammes.' }
  if (!/^\d+(\.\d+)?$/.test(trimmed)) {
    return { ok: false, error: 'Saisissez un nombre, par exemple 62 ou 62,5.' }
  }
  const value = Number(trimmed)
  if (value <= 0 || value > 400) {
    return { ok: false, error: 'Saisissez un poids compris entre 1 et 400 kg.' }
  }
  return { ok: true, value }
}

export function parseLastDonationDate(raw: string, today: string): FieldParseResult<string> {
  const trimmed = raw.trim()
  if (!trimmed) return { ok: false, error: 'Indiquez la date de votre dernier don.' }
  const parsed = isoDateSchema.safeParse(trimmed)
  if (!parsed.success) {
    return { ok: false, error: 'Cette date n’existe pas. Vérifiez le jour et le mois.' }
  }
  if (trimmed > today) {
    return { ok: false, error: 'La date du dernier don ne peut pas être dans le futur.' }
  }
  return { ok: true, value: trimmed }
}

export function answersFromLastDonation(
  kind: LastDonationKind,
  lastDonationDate: string | null,
): Pick<EligibilityAnswers, 'hasDonatedBefore' | 'lastDonationDate' | 'dateKnown'> {
  if (kind === 'never') {
    return { hasDonatedBefore: false, lastDonationDate: null, dateKnown: false }
  }
  if (kind === 'unknown') {
    return { hasDonatedBefore: true, lastDonationDate: null, dateKnown: false }
  }
  return { hasDonatedBefore: true, lastDonationDate, dateKnown: true }
}

export function evaluateAgeRequirement(
  age: number,
  options: EvaluationOptions = {},
): EligibilityResult | null {
  if (age < MIN_AGE) {
    return criterionResult(['age_below_minimum'], options, MIN_AGE - age)
  }
  if (age > MAX_AGE) return criterionResult(['age_above_maximum'], options)
  return null
}

export function evaluateEligibility(
  answers: EligibilityAnswers,
  options: EvaluationOptions = {},
): EligibilityResult {
  const ageResult = evaluateAgeRequirement(answers.age, options)
  if (ageResult) return ageResult
  if (answers.weightKg < MIN_WEIGHT_KG) {
    return criterionResult(['weight_below_minimum'], options)
  }

  if (!answers.hasDonatedBefore) {
    return {
      status: 'can_consider',
      reasonCodes: ['never_donated_criteria_met'],
      nextEligibleDate: null,
      minorWaitYears: null,
      medicalDisclaimer: 'medical_eligibility',
      nextAction: 'locations',
      computedAt: computedAt(options),
    }
  }

  if (!answers.dateKnown || !answers.lastDonationDate) {
    return {
      status: 'uncertain',
      reasonCodes: ['last_donation_unknown'],
      nextEligibleDate: null,
      minorWaitYears: null,
      medicalDisclaimer: 'medical_eligibility',
      nextAction: 'professional',
      computedAt: computedAt(options),
    }
  }

  const nextEligibleDate = addCalendarMonths(
    answers.lastDonationDate,
    INTERVAL_MONTHS[answers.intervalCategory],
  )
  if ((options.today ?? todayIso(options.now)) < nextEligibleDate) {
    return {
      status: 'wait',
      reasonCodes: ['interval_not_reached'],
      nextEligibleDate,
      minorWaitYears: null,
      medicalDisclaimer: 'medical_eligibility',
      nextAction: 'preparation',
      computedAt: computedAt(options),
    }
  }

  return {
    status: 'can_consider',
    reasonCodes: ['criteria_met'],
    nextEligibleDate,
    minorWaitYears: null,
    medicalDisclaimer: 'medical_eligibility',
    nextAction: 'locations',
    computedAt: computedAt(options),
  }
}
