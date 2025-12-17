import { useEffect, useState } from 'react'
import { supabase, type Session } from '../lib/supabase'

export function Schedule() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSessions() {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching sessions:', error)
      } else if (data) {
        setSessions(data)
      }
      setLoading(false)
    }

    fetchSessions()
  }, [])

  return (
    <section className="px-6 py-20 md:py-28 bg-cream">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
            מועדים
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-warm-brown mt-3">
            סדנאות קרובות
          </h2>
          <p className="mt-4 text-warm-gray max-w-xl mx-auto leading-relaxed">
            הסדנאות מתקיימות בקבוצות קטנות, והמקומות מוגבלים. <br />
            המועדים נקבעים בהתאם לבקשות המשתתפים, והכתובת תימסר לאחר התיאום.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
            <p className="mt-4 text-warm-gray">טוען סדנאות...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-12 bg-warm-white rounded-2xl border border-cream-dark/30">
            <p className="text-warm-gray">אין סדנאות פתוחות כרגע. השאירו פרטים ונעדכן אתכם!</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {sessions.map((session, index) => {
              const isFull = session.seats_left === 0

              return (
                <article
                  key={session.id}
                  className={`group relative bg-warm-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-cream-dark/30 overflow-hidden ${isFull ? 'opacity-75' : ''}`}
                >
                  {/* Decorative accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-terracotta/5 to-transparent rounded-bl-full" />

                  <div className="relative">
                    {/* Date badge */}
                    <div className="inline-flex items-center gap-2 bg-cream rounded-full px-4 py-2 mb-5">
                      <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span className="text-sm font-medium text-warm-brown">סדנה {index + 1}</span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-warm-brown mb-3">
                      {session.date}
                    </h3>

                    <div className="space-y-2 text-warm-gray">
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{session.time}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span>{session.location}</span>
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-cream-dark/30 flex items-center justify-between">
                      <p className="text-sm text-warm-gray-light flex items-center gap-2">
                        <svg className="w-4 h-4 text-dusty-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        בקבוצה קטנה
                      </p>

                      {/* Seats availability */}
                      {isFull ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-warm-gray-light/20 text-warm-gray rounded-full text-sm font-medium">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          מלא
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sage/20 text-sage-dark rounded-full text-sm font-medium">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          נשארו {session.seats_left} מקומות
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Call to action */}
        <div className="mt-12 text-center">
          <a
            href="#registration"
            className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta text-warm-white font-medium rounded-full hover:bg-terracotta-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>לשריון מקום</span>
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
