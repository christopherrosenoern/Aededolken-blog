import { Link } from '@tanstack/react-router'
import { marked } from 'marked'
import { type Dinner } from 'content-collections'

import { cdn } from '@/lib/dinners'

export default function DinnerPost({
  dinner,
  permalink = true,
}: {
  dinner: Dinner
  permalink?: boolean
}) {
  return (
    <article className="post">
      {/* 1. Month, year, host & theme */}
      <header className="post-head">
        <div className="post-date">
          <span className="post-month">{dinner.monthName}</span>
          <span className="post-year">{dinner.year}</span>
        </div>
        <div className="post-meta">
          <h2 className="post-theme">
            {permalink ? (
              <Link to="/dinners/$slug" params={{ slug: dinner.slug }}>
                {dinner.theme}
              </Link>
            ) : (
              dinner.theme
            )}
          </h2>
          <p className="post-host">
            Host: <b>{dinner.host}</b>
          </p>
        </div>
      </header>

      {/* 2. Menu */}
      <section className="box">
        <h3 className="box-title">~ Menu ~</h3>
        <ul className="menu-list">
          {dinner.menu.map((m, i) => (
            <li key={i}>
              <span className="course">{m.course}</span>
              <span className="dish">{m.dish}</span>
              {m.note && <span className="note">({m.note})</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Wine & drinks */}
      {dinner.drinks.length > 0 && (
        <section className="box">
          <h3 className="box-title">Wine &amp; drinks</h3>
          <ul className="drink-list">
            {dinner.drinks.map((d, i) => (
              <li key={i}>
                <b>{d.name}</b>
                {d.note && <span className="note"> – {d.note}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 4. Photos */}
      {dinner.photos.length > 0 && (
        <section className="box">
          <h3 className="box-title">Photos</h3>
          <div className="photos">
            {dinner.photos.map((p, i) => (
              <figure key={i} className="polaroid">
                <a href={cdn(p.src, 1600)} target="_blank" rel="noreferrer">
                  <img
                    src={cdn(p.src, 600)}
                    srcSet={`${cdn(p.src, 600)} 600w, ${cdn(p.src, 1000)} 1000w`}
                    sizes="(max-width: 640px) 90vw, 260px"
                    alt={p.caption ?? `${dinner.theme} photo ${i + 1}`}
                    loading="lazy"
                  />
                </a>
                {p.caption && <figcaption>{p.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      {dinner.content.trim() && (
        <div
          className="recap"
          dangerouslySetInnerHTML={{ __html: marked(dinner.content) }}
        />
      )}

      {/* 5. Quotes */}
      <section className="box quotes-box">
        <h3 className="box-title">Quotes of the night</h3>
        {dinner.quotes.length > 0 ? (
          dinner.quotes.map((q, i) => (
            <blockquote key={i} className="quote">
              <p>“{q.text}”</p>
              {q.by && <cite>– {q.by}</cite>}
            </blockquote>
          ))
        ) : (
          <p className="note">No quotes yet… who said what?</p>
        )}
      </section>

      <footer className="post-foot">
        Posted by {dinner.host} ·{' '}
        <Link to="/dinners/$slug" params={{ slug: dinner.slug }}>
          permalink
        </Link>
      </footer>
    </article>
  )
}
