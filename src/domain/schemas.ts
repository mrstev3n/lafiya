import { z } from 'zod'

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

export const isoDateSchema = z
  .string()
  .regex(isoDatePattern, 'Date ISO attendue')
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`)
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value)
  }, 'Date calendaire invalide')
export const disclaimerKeySchema = z.enum([
  'challenge_demo_data',
  'medical_eligibility',
  'non_affiliation',
  'unknown_operational_data',
])

export const dataProvenanceSchema = z
  .object({
    kind: z.enum(['public_fact', 'simulated', 'unknown']),
    asOf: isoDateSchema,
    sourceLabel: z.string().min(1).optional(),
    sourceUrl: z.url().optional(),
    disclaimerKey: disclaimerKeySchema,
    verifiedBy: z.enum(['human', 'codex', 'external']),
    confidence: z.enum(['confirmed', 'candidate', 'demo']),
    expiresAt: isoDateSchema.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.kind === 'public_fact') {
      if (!value.sourceLabel || !value.sourceUrl) {
        context.addIssue({
          code: 'custom',
          message: 'Un fait public exige une source lisible et une URL.',
        })
      }

      if (value.confidence !== 'confirmed') {
        context.addIssue({
          code: 'custom',
          path: ['confidence'],
          message: 'Un fait public doit être confirmé.',
        })
      }
    }

    if (value.kind === 'simulated' && value.confidence !== 'demo') {
      context.addIssue({
        code: 'custom',
        path: ['confidence'],
        message: 'Une simulation doit porter la confiance demo.',
      })
    }

    if (value.kind === 'unknown' && value.confidence !== 'candidate') {
      context.addIssue({
        code: 'custom',
        path: ['confidence'],
        message: 'Une donnée inconnue doit rester candidate.',
      })
    }

    if (value.expiresAt && value.expiresAt < value.asOf) {
      context.addIssue({
        code: 'custom',
        path: ['expiresAt'],
        message: "L'expiration ne peut pas précéder la date de référence.",
      })
    }
  })

const simulatedProvenanceSchema = dataProvenanceSchema.refine(
  (value) => value.kind === 'simulated',
  'Une provenance simulée est obligatoire.',
)

const publicFactProvenanceSchema = dataProvenanceSchema.refine(
  (value) => value.kind === 'public_fact',
  'Une provenance de fait public est obligatoire.',
)

export const cityIdSchema = z.enum([
  'cotonou',
  'abomey-calavi',
  'porto-novo',
])

export const donationCentreSchema = z
  .object({
    id: z.string().regex(/^ants-\d+$/),
    officialId: z.number().int().positive(),
    displayName: z.string().min(3),
    cityId: cityIdSchema,
    structureType: z.enum(['sts', 'pts']),
    address: z.string().min(10),
    latitude: z.number().min(6).max(13),
    longitude: z.number().min(0).max(4),
    sourceUrl: z.url(),
    publishedAt: isoDateSchema,
    updatedAt: isoDateSchema,
    provenance: publicFactProvenanceSchema,
  })
  .strict()
  .superRefine((centre, context) => {
    if (centre.provenance.sourceUrl !== centre.sourceUrl) {
      context.addIssue({
        code: 'custom',
        path: ['provenance', 'sourceUrl'],
        message: 'La provenance doit reprendre la source du lieu.',
      })
    }
  })

export const donationCentresSchema = z
  .array(donationCentreSchema)
  .length(4)
  .superRefine((centres, context) => {
    const ids = new Set(centres.map((centre) => centre.id))
    const officialIds = new Set(centres.map((centre) => centre.officialId))

    if (ids.size !== centres.length) {
      context.addIssue({ code: 'custom', message: 'Les identifiants de centres doivent être uniques.' })
    }

    if (officialIds.size !== centres.length) {
      context.addIssue({ code: 'custom', message: 'Les identifiants ANTS doivent être uniques.' })
    }
  })

export const bloodGroupSchema = z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])

export const reserveSnapshotSchema = z.object({
  bloodGroup: bloodGroupSchema,
  level: z.enum(['low', 'watch', 'stable']),
  label: z.string().min(1),
  provenance: simulatedProvenanceSchema,
}).strict()

export const reserveSnapshotsSchema = z
  .array(reserveSnapshotSchema)
  .length(8)
  .superRefine((snapshots, context) => {
    if (new Set(snapshots.map((snapshot) => snapshot.bloodGroup)).size !== snapshots.length) {
      context.addIssue({ code: 'custom', message: 'Chaque groupe sanguin doit apparaître une seule fois.' })
    }
  })

const contentThemeSchema = z.enum(['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'])

export const faqItemSchema = z.object({
  id: z.string().regex(/^faq-[a-z0-9-]+$/),
  question: z.string().min(10),
  answer: z.string().min(30),
  themes: z.array(contentThemeSchema).min(1),
  status: z.enum(['draft', 'reviewed', 'approved']),
  sourceRefs: z.array(z.url()),
  disclaimerKeys: z.array(disclaimerKeySchema),
}).strict()

export const faqSchema = z.array(faqItemSchema).min(4)

export const contentCatalogSchema = z.object({
  version: z.literal(1),
  datasetLabel: z.string().min(1),
  disclaimers: z.object({
    challenge_demo_data: z.string().min(30),
    medical_eligibility: z.string().min(30),
    non_affiliation: z.string().min(30),
    unknown_operational_data: z.string().min(30),
  }).strict(),
  reserveLevelLabels: z.object({
    low: z.string().min(1),
    watch: z.string().min(1),
    stable: z.string().min(1),
  }).strict(),
}).strict()

export const dataCatalogueSchema = z.object({
  centres: donationCentresSchema,
  reserves: reserveSnapshotsSchema,
  faq: faqSchema,
  content: contentCatalogSchema,
}).strict()

export type DataProvenance = z.infer<typeof dataProvenanceSchema>
export type DonationCentre = z.infer<typeof donationCentreSchema>
export type ReserveSnapshot = z.infer<typeof reserveSnapshotSchema>
export type FaqItem = z.infer<typeof faqItemSchema>
export type ContentCatalog = z.infer<typeof contentCatalogSchema>
export type DataCatalogue = z.infer<typeof dataCatalogueSchema>
