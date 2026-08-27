import { z } from 'zod'

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/

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

const qualifiedTextSchema = z.object({
  label: z.string().min(1),
  provenance: simulatedProvenanceSchema,
}).strict()

const schedulePeriodSchema = z
  .object({
    days: z.array(z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat'])).min(1),
    opensAt: z.string().regex(timePattern),
    closesAt: z.string().regex(timePattern),
  })
  .strict()
  .refine((period) => period.opensAt < period.closesAt, {
    message: "L'heure de fermeture doit suivre l'ouverture.",
    path: ['closesAt'],
  })

const qualifiedScheduleSchema = z.object({
  periods: z.array(schedulePeriodSchema).min(1),
  note: z.string().min(1),
  provenance: simulatedProvenanceSchema,
}).strict()

const donationOfferSchema = z.object({
  donationTypes: z.array(z.enum(['whole_blood', 'plasma', 'platelets'])).min(1),
  appointmentMode: z.enum(['walk_in_demo', 'appointment_demo', 'mixed_demo']),
  provenance: simulatedProvenanceSchema,
}).strict()

const availabilitySchema = z.object({
  status: z.enum(['available_demo', 'limited_demo', 'unavailable_demo']),
  provenance: simulatedProvenanceSchema,
}).strict()

export const cityIdSchema = z.enum([
  'cotonou',
  'abomey-calavi',
  'porto-novo',
  'ouidah',
  'seme-kpodji',
])

export const donationCentreSchema = z.object({
  id: z.string().regex(/^centre-demo-[a-z0-9-]+-\d{2}$/),
  candidateReference: z.enum([
    'GN-01',
    'GN-02',
    'GN-03',
    'GN-04',
    'GN-05',
    'GN-06',
    'GN-07',
    'GN-08',
  ]),
  displayName: z.string().regex(/démonstration/i),
  cityId: cityIdSchema,
  structureType: z.literal('demo'),
  modelledStructureType: z.enum(['sdts', 'pts', 'blood_bank', 'sts_or_pts', 'sdts_or_sts']),
  modelSourceRefs: z.array(z.url()).min(1),
  candidateCaveat: z.string().min(20),
  identityProvenance: simulatedProvenanceSchema,
  address: qualifiedTextSchema,
  schedule: qualifiedScheduleSchema,
  donationOffer: donationOfferSchema,
  availability: availabilitySchema,
}).strict()

export const donationCentresSchema = z
  .array(donationCentreSchema)
  .length(8)
  .superRefine((centres, context) => {
    const ids = new Set(centres.map((centre) => centre.id))
    const references = new Set(centres.map((centre) => centre.candidateReference))
    const cities = new Set(centres.map((centre) => centre.cityId))

    if (ids.size !== centres.length) {
      context.addIssue({ code: 'custom', message: 'Les identifiants de centres doivent être uniques.' })
    }

    if (references.size !== centres.length) {
      context.addIssue({ code: 'custom', message: 'Les références GN doivent être uniques.' })
    }

    if (cities.size !== 5) {
      context.addIssue({ code: 'custom', message: 'Le catalogue doit couvrir exactement cinq villes.' })
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
