import { describe, expect, it } from 'vitest'
import { centres } from '../data/catalogue.ts'
import { getCentreByCandidateReference, getCityIds } from './location.ts'

describe('helpers de localisation', () => {
  it('retourne les cinq villes du jeu de démonstration', () => {
    expect(getCityIds(centres)).toHaveLength(5)
  })

  it('retrouve un centre par sa référence candidate', () => {
    expect(getCentreByCandidateReference(centres, 'GN-06')?.cityId).toBe('porto-novo')
  })
})
