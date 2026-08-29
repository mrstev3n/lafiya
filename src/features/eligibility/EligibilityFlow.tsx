import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type RefObject,
} from 'react'
import { ActionLink } from '../../components/ui/ActionLink.tsx'
import { centres } from '../../data/catalogue.ts'
import {
  answersFromLastDonation,
  DEFAULT_INTERVAL_CATEGORY,
  evaluateAgeRequirement,
  evaluateEligibility,
  MIN_WEIGHT_KG,
  parseAge,
  parseLastDonationDate,
  parseWeightKg,
  todayIso,
  type EligibilityAnswers,
  type EligibilityResult,
  type LastDonationKind,
} from '../../domain/eligibility.ts'
import { CITY_LABELS, getCityIds } from '../../domain/location.ts'
import type { DonationCentre } from '../../domain/schemas.ts'
import { cityLocatorPath, writeSessionCity } from '../locations/cityPreference.ts'
import { buildReminderCalendar } from './calendar.ts'
import {
  LAST_DONATION_OPTIONS,
  orientationDisclaimer,
  resultDetail,
  resultHeading,
  resultNextHint,
  STEP_COPY,
} from './messages.ts'
import styles from './EligibilityFlow.module.css'

type Step = 'age' | 'weight' | 'lastDonation' | 'result'

const STEPS: Exclude<Step, 'result'>[] = ['age', 'weight', 'lastDonation']
const cityIds = getCityIds(centres)

type EligibilityFlowProps = {
  today?: string
}

function baseAnswers(age: number, weightKg: number): EligibilityAnswers {
  return {
    age,
    weightKg,
    intervalCategory: DEFAULT_INTERVAL_CATEGORY,
    hasDonatedBefore: false,
    lastDonationDate: null,
    dateKnown: false,
  }
}

function downloadReminder(nextEligibleDate: string) {
  const blob = new Blob([buildReminderCalendar(nextEligibleDate)], {
    type: 'text/calendar;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'lafiya-prochaine-date.ics'
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function EligibilityFlow({ today = todayIso() }: EligibilityFlowProps) {
  const formId = useId()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const weightRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<Step>('age')
  const [ageInput, setAgeInput] = useState('')
  const [weightInput, setWeightInput] = useState('')
  const [lastDonationKind, setLastDonationKind] = useState<LastDonationKind | ''>('')
  const [lastDonationDateInput, setLastDonationDateInput] = useState('')
  const [ageError, setAgeError] = useState<string | null>(null)
  const [weightError, setWeightError] = useState<string | null>(null)
  const [lastDonationError, setLastDonationError] = useState<string | null>(null)
  const [dateError, setDateError] = useState<string | null>(null)
  const [cityError, setCityError] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<DonationCentre['cityId'] | ''>('')
  const [result, setResult] = useState<EligibilityResult | null>(null)

  const stepIndex = step === 'result' ? STEPS.length : STEPS.indexOf(step) + 1
  const copy = step === 'result' ? null : STEP_COPY[step]
  const progressPercent = Math.round((stepIndex / STEPS.length) * 100)

  useEffect(() => {
    headingRef.current?.focus()
  }, [step])

  function focusField(ref: RefObject<HTMLInputElement | null>) {
    queueMicrotask(() => ref.current?.focus())
  }

  function showResult(nextResult: EligibilityResult) {
    setResult(nextResult)
    setStep('result')
  }

  function submitAge() {
    const parsed = parseAge(ageInput)
    if (!parsed.ok) {
      setAgeError(parsed.error)
      focusField(ageRef)
      return
    }
    setAgeError(null)
    const ageResult = evaluateAgeRequirement(parsed.value, { today })
    if (ageResult) {
      showResult(ageResult)
      return
    }
    setStep('weight')
  }

  function submitWeight() {
    const parsed = parseWeightKg(weightInput)
    if (!parsed.ok) {
      setWeightError(parsed.error)
      focusField(weightRef)
      return
    }
    setWeightError(null)

    const age = parseAge(ageInput)
    if (!age.ok) {
      setStep('age')
      return
    }
    if (parsed.value < MIN_WEIGHT_KG) {
      showResult(evaluateEligibility(baseAnswers(age.value, parsed.value), { today }))
      return
    }
    setStep('lastDonation')
  }

  function submitLastDonation() {
    if (!lastDonationKind) {
      setLastDonationError('Choisissez la réponse qui correspond à votre situation.')
      return
    }
    setLastDonationError(null)

    let lastDonationDate: string | null = null
    if (lastDonationKind === 'known') {
      const parsed = parseLastDonationDate(lastDonationDateInput, today)
      if (!parsed.ok) {
        setDateError(parsed.error)
        focusField(dateRef)
        return
      }
      lastDonationDate = parsed.value
    }
    setDateError(null)

    const age = parseAge(ageInput)
    const weight = parseWeightKg(weightInput)
    if (!age.ok || !weight.ok) {
      setStep(age.ok ? 'weight' : 'age')
      return
    }

    showResult(evaluateEligibility({
      age: age.value,
      weightKg: weight.value,
      intervalCategory: DEFAULT_INTERVAL_CATEGORY,
      ...answersFromLastDonation(lastDonationKind, lastDonationDate),
    }, { today }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step === 'age') submitAge()
    else if (step === 'weight') submitWeight()
    else if (step === 'lastDonation') submitLastDonation()
  }

  function reviewAnswers() {
    setCityError(null)
    setStep('age')
  }

  function handleCityDestination(event: MouseEvent<HTMLAnchorElement>) {
    if (!selectedCity) {
      event.preventDefault()
      setCityError('Choisissez une ville avant d’afficher les points de don.')
      return
    }
    writeSessionCity(selectedCity)
  }

  return (
    <div className={styles.panel}>
      {step !== 'result' ? (
        <div className={styles.progressGroup}>
          <p className={styles.stepLabel} id={`${formId}-progress-label`}>
            Étape {stepIndex} sur {STEPS.length}
          </p>
          <div
            aria-labelledby={`${formId}-progress-label`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progressPercent}
            aria-valuetext={`Étape ${stepIndex} sur ${STEPS.length}`}
            className={styles.progress}
            role="progressbar"
          >
            <span style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      ) : (
        <p className={styles.stepLabel}>Votre orientation</p>
      )}

      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        {copy ? (
          <div className={styles.questionHeading}>
            <h2 className={styles.title} ref={headingRef} tabIndex={-1}>{copy.title}</h2>
            <p className={styles.help} id={`${formId}-help`}>{copy.help}</p>
          </div>
        ) : null}

        {step === 'age' ? (
          <div className={styles.field}>
            <label htmlFor={`${formId}-age`}>Âge, en années</label>
            <input
              aria-describedby={ageError ? `${formId}-age-error ${formId}-help` : `${formId}-help`}
              aria-invalid={Boolean(ageError)}
              autoComplete="off"
              id={`${formId}-age`}
              inputMode="numeric"
              name="age"
              onChange={(event) => {
                setAgeInput(event.target.value)
                setAgeError(null)
              }}
              ref={ageRef}
              type="text"
              value={ageInput}
            />
            {ageError ? <p className={styles.error} id={`${formId}-age-error`} role="alert">{ageError}</p> : null}
          </div>
        ) : null}

        {step === 'weight' ? (
          <div className={styles.field}>
            <label htmlFor={`${formId}-weight`}>Poids, en kilogrammes</label>
            <input
              aria-describedby={weightError ? `${formId}-weight-error ${formId}-help` : `${formId}-help`}
              aria-invalid={Boolean(weightError)}
              autoComplete="off"
              id={`${formId}-weight`}
              inputMode="decimal"
              name="weightKg"
              onChange={(event) => {
                setWeightInput(event.target.value)
                setWeightError(null)
              }}
              ref={weightRef}
              type="text"
              value={weightInput}
            />
            {weightError ? <p className={styles.error} id={`${formId}-weight-error`} role="alert">{weightError}</p> : null}
          </div>
        ) : null}

        {step === 'lastDonation' ? (
          <fieldset
            aria-describedby={lastDonationError ? `${formId}-last-error ${formId}-help` : `${formId}-help`}
            className={styles.choices}
          >
            <legend className={styles.legend}>Votre dernier don</legend>
            {LAST_DONATION_OPTIONS.map((option) => (
              <label className={styles.choice} key={option.value}>
                <input
                  checked={lastDonationKind === option.value}
                  name="lastDonationKind"
                  onChange={() => {
                    setLastDonationKind(option.value)
                    setLastDonationError(null)
                    if (option.value !== 'known') setDateError(null)
                  }}
                  type="radio"
                  value={option.value}
                />
                <span>{option.label}</span>
              </label>
            ))}
            {lastDonationError ? <p className={styles.error} id={`${formId}-last-error`} role="alert">{lastDonationError}</p> : null}
            {lastDonationKind === 'known' ? (
              <div className={styles.field}>
                <label htmlFor={`${formId}-date`}>Date du dernier don</label>
                <input
                  aria-describedby={dateError ? `${formId}-date-error` : undefined}
                  aria-invalid={Boolean(dateError)}
                  id={`${formId}-date`}
                  max={today}
                  name="lastDonationDate"
                  onChange={(event) => {
                    setLastDonationDateInput(event.target.value)
                    setDateError(null)
                  }}
                  ref={dateRef}
                  type="date"
                  value={lastDonationDateInput}
                />
                {dateError ? <p className={styles.error} id={`${formId}-date-error`} role="alert">{dateError}</p> : null}
              </div>
            ) : null}
          </fieldset>
        ) : null}

        {step === 'result' && result ? (
          <div className={styles.result}>
            <h2 className={styles.title} ref={headingRef} tabIndex={-1}>{resultHeading(result)}</h2>
            <div className={styles.resultBox} data-status={result.status}>
              <strong>{resultDetail(result)}</strong>
              {result.status !== 'criterion_not_met' ? <span>{orientationDisclaimer()}</span> : null}
            </div>

            {result.status !== 'criterion_not_met' ? (
              <fieldset
                aria-describedby={cityError ? `${formId}-city-error` : undefined}
                className={styles.choices}
              >
                <legend className={styles.legend}>Dans quelle ville souhaitez-vous poursuivre ?</legend>
                <div className={styles.cityChoices}>
                  {cityIds.map((cityId) => (
                    <label className={styles.choice} key={cityId}>
                      <input
                        checked={selectedCity === cityId}
                        name="city"
                        onChange={() => {
                          setSelectedCity(cityId)
                          setCityError(null)
                        }}
                        type="radio"
                        value={cityId}
                      />
                      <span>{CITY_LABELS[cityId]}</span>
                    </label>
                  ))}
                </div>
                {cityError ? <p className={styles.error} id={`${formId}-city-error`} role="alert">{cityError}</p> : null}
              </fieldset>
            ) : null}

            <p className={styles.nextHint}>{resultNextHint(result)}</p>
          </div>
        ) : null}

        <div className={styles.actions}>
          {step === 'age' ? <ActionLink className={styles.ghostLink} href="/" tone="secondary">Revenir à l’accueil</ActionLink> : null}
          {step === 'weight' ? <button className={styles.secondary} onClick={() => setStep('age')} type="button">Retour</button> : null}
          {step === 'lastDonation' ? <button className={styles.secondary} onClick={() => setStep('weight')} type="button">Retour</button> : null}
          {step === 'result' ? <button className={styles.secondary} onClick={reviewAnswers} type="button">Modifier mes réponses</button> : null}

          {step !== 'result' ? <button className={styles.primary} type="submit">{copy?.continueLabel}</button> : null}

          {step === 'result' && result?.status === 'wait' && result.nextEligibleDate ? (
            <button className={styles.secondary} onClick={() => downloadReminder(result.nextEligibleDate!)} type="button">
              Ajouter cette date au calendrier
            </button>
          ) : null}

          {step === 'result' && result?.status === 'criterion_not_met' ? (
            <ActionLink href="/le-don" tone="secondary">Comprendre le parcours du don</ActionLink>
          ) : null}

          {step === 'result' && result && result.status !== 'criterion_not_met' ? (
            <a
              className={styles.primaryLink}
              href={selectedCity ? cityLocatorPath(selectedCity) : '/ou-donner'}
              onClick={handleCityDestination}
            >
              Afficher les points de don
            </a>
          ) : null}
        </div>
      </form>
    </div>
  )
}
