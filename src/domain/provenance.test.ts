import { describe, expect, it } from 'vitest'
import { content } from '../data/catalogue.ts'
import { getDisclaimer, isExpired, isSimulated } from './provenance.ts'
import type { DataProvenance } from './schemas.ts'

const provenance: DataProvenance = {
  kind: 'simulated',
  asOf: '2026-08-24',
  disclaimerKey: 'challenge_demo_data',
  verifiedBy: 'codex',
  confidence: 'demo',
  expiresAt: '2026-09-24',
}

describe('helpers de provenance', () => {
  it('identifie une simulation', () => {
    expect(isSimulated(provenance)).toBe(true)
  })

  it('détecte une donnée après sa date d’expiration', () => {
    expect(isExpired(provenance, '2026-09-24')).toBe(false)
    expect(isExpired(provenance, '2026-09-25')).toBe(true)
  })

  it('résout la mention centralisée associée', () => {
    expect(getDisclaimer(provenance, content)).toContain('entièrement simulées')
  })
})
