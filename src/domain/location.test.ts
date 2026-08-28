import { describe, expect, it } from 'vitest'
import { centres } from '../data/catalogue.ts'
import { getCentreByOfficialId, getCityIds } from './location.ts'

describe('helpers de localisation', () => {
  it('retourne les trois villes couvertes par la source officielle', () => {
    expect(getCityIds(centres)).toHaveLength(3)
  })

  it('retrouve un centre par son identifiant ANTS', () => {
    expect(getCentreByOfficialId(centres, 52)?.cityId).toBe('porto-novo')
  })
})
