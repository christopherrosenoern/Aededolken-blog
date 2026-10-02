import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import DinnerPost from '@/components/DinnerPost'
import { dinners, findDinner } from '@/lib/dinners'

export const Route = createFileRoute('/dinners/$slug')({
  loader: ({ params }) => {
    const dinner = findDinner(params.slug)
    if (!dinner) throw notFound()
    return dinner
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.monthName} ${loaderData.year}: ${loaderData.theme} | Ædedolken` }]
      : [],
  }),
  component: RouteComponent,
  notFoundComponent: () => (
    <div className="post">
      <h2 className="post-theme">404 – the plate is empty</h2>
      <p>
        That dinner doesn't exist (yet). <Link to="/">Back to the front page</Link>
      </p>
    </div>
  ),
})

function RouteComponent() {
  const dinner = Route.useLoaderData()
  const i = dinners.findIndex((d) => d.slug === dinner.slug)
  const newer = dinners[i - 1]
  const older = dinners[i + 1]

  return (
    <>
      <DinnerPost dinner={dinner} permalink={false} />
      <nav className="pager">
        {older ? (
          <Link to="/dinners/$slug" params={{ slug: older.slug }}>
            « {older.monthName} {older.year}
          </Link>
        ) : (
          <span />
        )}
        <Link to="/">Front page</Link>
        {newer ? (
          <Link to="/dinners/$slug" params={{ slug: newer.slug }}>
            {newer.monthName} {newer.year} »
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  )
}
