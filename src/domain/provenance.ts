import type { ContentCatalog, DataProvenance } from './schemas.ts'

export function isSimulated(provenance: DataProvenance): boolean {
  return provenance.kind === 'simulated'
}

export function isExpired(provenance: DataProvenance, referenceDate: string): boolean {
  return provenance.expiresAt !== undefined && provenance.expiresAt < referenceDate
}

export function getDisclaimer(
  provenance: DataProvenance,
  content: ContentCatalog,
): string {
  return content.disclaimers[provenance.disclaimerKey]
}
