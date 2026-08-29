import {
  formatIsoDateFr,
  type EligibilityReasonCode,
  type EligibilityResult,
} from '../../domain/eligibility.ts'

export const STEP_COPY = {
  age: {
    title: 'Quel âge avez-vous ?',
    help: 'Le don de sang est généralement proposé aux personnes de 18 à 65 ans.',
    continueLabel: 'Vérifier mon âge',
  },
  weight: {
    title: 'Quel est votre poids ?',
    help: 'Le repère général utilisé ici est un poids d’au moins 50 kg.',
    continueLabel: 'Passer au dernier don',
  },
  lastDonation: {
    title: 'Quand avez-vous donné pour la dernière fois ?',
    help: 'Cette date permet d’estimer si un délai de quatre mois s’est écoulé.',
    continueLabel: 'Voir mon orientation',
  },
} as const

export const LAST_DONATION_OPTIONS = [
  { value: 'never', label: 'Je n’ai jamais donné' },
  { value: 'known', label: 'Je connais la date' },
  { value: 'unknown', label: 'Je ne me souviens pas de la date' },
] as const

export const REASON_COPY: Record<EligibilityReasonCode, string> = {
  age_below_minimum: 'Le don de sang est envisagé à partir de 18 ans.',
  age_above_maximum: 'Le repère d’âge général pour le don de sang s’arrête à 65 ans.',
  weight_below_minimum: 'Le repère général utilisé pour le poids est de 50 kg minimum.',
  interval_not_reached: 'Un délai de quatre mois depuis le dernier don n’est pas encore écoulé.',
  last_donation_unknown: 'Sans date, le délai depuis le dernier don ne peut pas être estimé ici.',
  criteria_met: 'Les trois repères renseignés permettent de poursuivre votre démarche.',
  never_donated_criteria_met: 'Votre âge et votre poids permettent de poursuivre cette première démarche.',
}

export function resultHeading(result: EligibilityResult): string {
  if (result.reasonCodes.includes('age_below_minimum')) return 'Votre démarche commence déjà.'
  if (result.reasonCodes.includes('age_above_maximum')) return 'Votre intention reste précieuse.'
  if (result.reasonCodes.includes('weight_below_minimum')) return 'Merci d’avoir pris le temps de vérifier.'
  if (result.status === 'can_consider') return 'Vous pouvez poursuivre votre démarche.'
  if (result.status === 'wait') return 'Une prochaine date peut être envisagée.'
  return 'Un point de don pourra vous guider.'
}

export function resultDetail(result: EligibilityResult): string {
  if (result.reasonCodes.includes('age_below_minimum') && result.minorWaitYears) {
    const unit = result.minorWaitYears === 1 ? 'an' : 'ans'
    return `Avec l’âge indiqué, il reste environ ${result.minorWaitYears} ${unit} avant de pouvoir refaire ce point.`
  }
  if (result.reasonCodes.includes('age_above_maximum')) {
    return 'L’âge indiqué dépasse le repère général de 65 ans. Vous pouvez néanmoins soutenir le don volontaire en informant et en encourageant votre entourage.'
  }
  if (result.reasonCodes.includes('weight_below_minimum')) {
    return 'Avec le poids indiqué, ce questionnaire ne vous oriente pas vers un don aujourd’hui. Votre intérêt pour le don reste utile.'
  }
  if (result.status === 'can_consider') return REASON_COPY[result.reasonCodes[0]]
  if (result.status === 'wait' && result.nextEligibleDate) {
    return `En tenant compte d’un délai de quatre mois, vous pourrez refaire ce point à partir du ${formatIsoDateFr(result.nextEligibleDate)}.`
  }
  return REASON_COPY.last_donation_unknown
}

export function resultNextHint(result: EligibilityResult): string {
  if (result.reasonCodes.includes('age_below_minimum')) {
    return 'En attendant, vous pouvez découvrir le parcours du don et partager des informations utiles autour de vous.'
  }
  if (result.status === 'criterion_not_met') {
    return 'Vous pouvez découvrir le parcours du don et d’autres façons de soutenir la mobilisation.'
  }
  if (result.status === 'wait') {
    return 'Vous pouvez conserver cette date, préparer une prochaine venue ou contacter un point de don.'
  }
  if (result.status === 'uncertain') {
    return 'Choisissez une ville pour trouver une structure qui pourra vous renseigner.'
  }
  return 'Choisissez une ville pour consulter les points de don proches de vous.'
}

export function orientationDisclaimer(): string {
  return 'Cette orientation s’appuie sur trois repères généraux. À votre arrivée, l’équipe de collecte vérifiera avec vous que le don est adapté à votre situation.'
}

export function waitCalendarSummary(nextEligibleDate: string): string {
  return `Rappel Lafiya — refaire le point à partir du ${formatIsoDateFr(nextEligibleDate)}`
}
