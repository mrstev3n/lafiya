import { parseCityId } from '../../domain/location.ts'
import type { DonationCentre } from '../../domain/schemas.ts'

export const SELECTED_CITY_SESSION_KEY = 'lafiya.selectedCity'

export function readSessionCity(): DonationCentre['cityId'] | null {
  try {
    return parseCityId(sessionStorage.getItem(SELECTED_CITY_SESSION_KEY))
  } catch {
    return null
  }
}

export function writeSessionCity(cityId: DonationCentre['cityId'] | null): boolean {
  try {
    if (cityId) sessionStorage.setItem(SELECTED_CITY_SESSION_KEY, cityId)
    else sessionStorage.removeItem(SELECTED_CITY_SESSION_KEY)
    return true
  } catch {
    return false
  }
}

export function cityLocatorPath(cityId: DonationCentre['cityId']): string {
  return `/ou-donner?ville=${cityId}`
}
