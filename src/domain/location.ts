import type { DonationCentre } from './schemas.ts'

export function getCityIds(centres: readonly DonationCentre[]): string[] {
  return [...new Set(centres.map((centre) => centre.cityId))]
}

export function getCentreByCandidateReference(
  centres: readonly DonationCentre[],
  candidateReference: DonationCentre['candidateReference'],
): DonationCentre | undefined {
  return centres.find((centre) => centre.candidateReference === candidateReference)
}
