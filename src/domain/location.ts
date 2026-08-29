import { cityIdSchema, type DonationCentre } from './schemas.ts'

export const CITY_LABELS: Record<DonationCentre['cityId'], string> = {
  'abomey-calavi': 'Abomey-Calavi',
  cotonou: 'Cotonou',
  'porto-novo': 'Porto-Novo',
}

export function getCityIds(centres: readonly DonationCentre[]): DonationCentre['cityId'][] {
  return [...new Set(centres.map((centre) => centre.cityId))]
}

export function parseCityId(value: string | null | undefined): DonationCentre['cityId'] | null {
  const parsed = cityIdSchema.safeParse(value)
  return parsed.success ? parsed.data : null
}

export function getCentreByOfficialId(
  centres: readonly DonationCentre[],
  officialId: DonationCentre['officialId'],
): DonationCentre | undefined {
  return centres.find((centre) => centre.officialId === officialId)
}
