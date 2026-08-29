import { describe, expect, it } from 'vitest'
import { centres } from '../data/catalogue.ts'
import { getCentreByOfficialId, getCityIds, parseCityId } from './location.ts'

describe('helpers de localisation', () => {
  it('retourne les trois villes couvertes par la source officielle', () => {
    expect(getCityIds(centres)).toHaveLength(3)
  })

  it('n’accepte qu’un identifiant de ville du catalogue', () => {
    expect(parseCityId('cotonou')).toBe('cotonou')
    expect(parseCityId('ouidah')).toBeNull()
    expect(parseCityId(null)).toBeNull()
  })

  it('retrouve un centre par son identifiant ANTS', () => {
    expect(getCentreByOfficialId(centres, 52)?.cityId).toBe('porto-novo')
  })
})
