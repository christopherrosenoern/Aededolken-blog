import { allDinners, type Dinner } from 'content-collections'

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** All dinners, newest first. */
export const dinners: Dinner[] = [...allDinners].sort(
  (a, b) => b.year - a.year || b.month - a.month,
)

export const years = [...new Set(dinners.map((d) => d.year))]

export function findDinner(slug: string) {
  return dinners.find((d) => d.slug === slug)
}

/** Serve local images through the Netlify Image CDN. */
export function cdn(src: string, width: number) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp`
}
