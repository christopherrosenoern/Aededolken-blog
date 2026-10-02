import { createFileRoute } from '@tanstack/react-router'

import DinnerPost from '@/components/DinnerPost'
import { dinners } from '@/lib/dinners'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      {dinners.map((d) => (
        <DinnerPost key={d.slug} dinner={d} />
      ))}
    </>
  )
}
