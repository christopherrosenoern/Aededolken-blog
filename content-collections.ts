import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const dinners = defineCollection({
  name: 'dinners',
  directory: 'content/dinners',
  include: '**/*.md',
  schema: z.object({
    month: z.number().int().min(1).max(12),
    year: z.number().int(),
    host: z.string(),
    theme: z.string(),
    menu: z.array(
      z.object({
        course: z.string(),
        dish: z.string(),
        note: z.string().optional(),
      }),
    ),
    drinks: z
      .array(
        z.object({
          name: z.string(),
          note: z.string().optional(),
        }),
      )
      .default([]),
    photos: z
      .array(
        z.object({
          src: z.string(),
          caption: z.string().optional(),
        }),
      )
      .default([]),
    quotes: z
      .array(
        z.object({
          text: z.string(),
          by: z.string().optional(),
        }),
      )
      .default([]),
    content: z.string(),
  }),
  transform: async (doc) => ({
    ...doc,
    monthName: MONTHS[doc.month - 1],
    slug: `${doc.year}-${String(doc.month).padStart(2, '0')}`,
  }),
})

export default defineConfig({
  collections: [dinners],
})
