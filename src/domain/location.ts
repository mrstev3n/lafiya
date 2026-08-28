import type { DonationCentre } from './schemas.ts'

export function getCityIds(centres: readonly DonationCentre[]): string[] {
  return [...new Set(centres.map((centre) => centre.cityId))]
}

export function getCentreByOfficialId(
  centres: readonly DonationCentre[],
  officialId: DonationCentre['officialId'],
): DonationCentre | undefined {
  return centres.find((centre) => centre.officialId === officialId)
}
