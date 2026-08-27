import centresJson from './centres.json'
import contentJson from './content.json'
import faqJson from './faq.json'
import reservesJson from './reserves.json'
import { dataCatalogueSchema } from '../domain/schemas.ts'

export const dataCatalogue = dataCatalogueSchema.parse({
  centres: centresJson,
  reserves: reservesJson,
  faq: faqJson,
  content: contentJson,
})

export const { centres, reserves, faq, content } = dataCatalogue
