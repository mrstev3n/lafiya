import { describe, expect, it } from 'vitest'
import centresJson from './centres.json'
import reservesJson from './reserves.json'
import { centres, content, dataCatalogue, faq, reserves } from './catalogue.ts'
import {
  dataProvenanceSchema,
  donationCentresSchema,
  reserveSnapshotsSchema,
} from '../domain/schemas.ts'

describe('catalogue de données Lafiya', () => {
  it('valide le catalogue complet', () => {
    expect(dataCatalogue.centres).toHaveLength(8)
    expect(dataCatalogue.reserves).toHaveLength(8)
    expect(dataCatalogue.faq.length).toBeGreaterThanOrEqual(4)
  })

  it('couvre huit candidats dans cinq villes', () => {
    expect(new Set(centres.map((centre) => centre.candidateReference)).size).toBe(8)
    expect(new Set(centres.map((centre) => centre.cityId)).size).toBe(5)
    expect(centres.every((centre) => centre.structureType === 'demo')).toBe(true)
  })

  it('qualifie chaque donnée opérationnelle comme simulation datée', () => {
    for (const centre of centres) {
      const provenances = [
        centre.identityProvenance,
        centre.address.provenance,
        centre.schedule.provenance,
        centre.donationOffer.provenance,
        centre.availability.provenance,
      ]

      for (const provenance of provenances) {
        expect(provenance.kind).toBe('simulated')
        expect(provenance.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(provenance.disclaimerKey).toBe('challenge_demo_data')
      }
    }
  })

  it('couvre une seule fois chacun des huit groupes sanguins', () => {
    expect(new Set(reserves.map((snapshot) => snapshot.bloodGroup)).size).toBe(8)
    expect(reserves.every((snapshot) => snapshot.provenance.kind === 'simulated')).toBe(true)

    for (const snapshot of reserves) {
      expect(snapshot.label).toBe(content.reserveLevelLabels[snapshot.level])
    }
  })

  it('résout toutes les mentions utilisées par la FAQ', () => {
    const disclaimerKeys = new Set(Object.keys(content.disclaimers))

    for (const item of faq) {
      for (const key of item.disclaimerKeys) {
        expect(disclaimerKeys.has(key)).toBe(true)
      }
    }
  })

  it('rejette une simulation présentée comme confirmée', () => {
    const result = dataProvenanceSchema.safeParse({
      kind: 'simulated',
      asOf: '2026-08-24',
      disclaimerKey: 'challenge_demo_data',
      verifiedBy: 'codex',
      confidence: 'confirmed',
    })

    expect(result.success).toBe(false)
  })

  it('rejette un fait public sans URL', () => {
    const result = dataProvenanceSchema.safeParse({
      kind: 'public_fact',
      asOf: '2026-08-23',
      sourceLabel: 'Source publique',
      disclaimerKey: 'unknown_operational_data',
      verifiedBy: 'human',
      confidence: 'confirmed',
    })

    expect(result.success).toBe(false)
  })

  it('rejette une date impossible et un champ opérationnel inattendu', () => {
    const invalidDate = dataProvenanceSchema.safeParse({
      kind: 'simulated',
      asOf: '2026-02-30',
      disclaimerKey: 'challenge_demo_data',
      verifiedBy: 'codex',
      confidence: 'demo',
    })
    const centreWithContact = {
      ...centresJson[0],
      contact: { phone: '+229 00 00 00 00' },
    }

    expect(invalidDate.success).toBe(false)
    expect(donationCentresSchema.safeParse([centreWithContact, ...centresJson.slice(1)]).success).toBe(false)
  })

  it('rejette les doublons de centre et de groupe sanguin', () => {
    const duplicateCentres = [...centresJson.slice(0, 7), centresJson[0]]
    const duplicateReserves = [...reservesJson.slice(0, 7), reservesJson[0]]

    expect(donationCentresSchema.safeParse(duplicateCentres).success).toBe(false)
    expect(reserveSnapshotsSchema.safeParse(duplicateReserves).success).toBe(false)
  })
})
