/**
 * Registrations View Component - צפייה בהרשמות
 *
 * Displays all registrations with:
 * - Filter by session
 * - Export to CSV
 * - View details per registration
 */

import { useEffect, useState } from 'react'
import { supabase, type Session } from '../../lib/supabase'
import type { RegistrationWithSession } from '../../pages/AdminPage'

type RegistrationsViewProps = {
  sessions: Session[]
}

export function RegistrationsView({ sessions }: RegistrationsViewProps) {
  const [registrations, setRegistrations] = useState<RegistrationWithSession[]>([])
  const [loading, setLoading] = useState(true)
  const [filterSessionId, setFilterSessionId] = useState<string>('')

  // Fetch registrations
  useEffect(() => {
    fetchRegistrations()
  }, [filterSessionId])

  async function fetchRegistrations() {
    setLoading(true)

    let query = supabase
      .from('registrations')
      .select(`
        *,
        sessions (
          date,
          time
        )
      `)
      .order('created_at', { ascending: false })

    // Apply filter if selected
    if (filterSessionId) {
      query = query.eq('session_id', filterSessionId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching registrations:', error)
    } else if (data) {
      setRegistrations(data as RegistrationWithSession[])
    }
    setLoading(false)
  }

  // Export to CSV
  function exportToCSV() {
    if (registrations.length === 0) {
      alert('אין הרשמות לייצוא')
      return
    }

    // CSV Headers
    const headers = ['שם', 'אימייל', 'הערות', 'סדנה', 'תאריך הרשמה', 'סטטוס']

    // CSV Rows
    const rows = registrations.map((reg) => [
      reg.name,
      reg.email,
      reg.message || '',
      reg.sessions ? `${reg.sessions.date} ${reg.sessions.time}` : 'לא נבחר',
      new Date(reg.created_at).toLocaleDateString('he-IL'),
      reg.status === 'pending' ? 'ממתין' : reg.status,
    ])

    // Create CSV content with BOM for Hebrew support
    const BOM = '\uFEFF'
    const csvContent =
      BOM +
      [headers, ...rows]
        .map((row) => row.map((cell) => `"${cell}"`).join(','))
        .join('\n')

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  // Format date for display
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('he-IL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="font-serif text-xl text-warm-brown">
          כל ההרשמות ({registrations.length})
        </h2>

        <div className="flex flex-wrap gap-3">
          {/* Session Filter */}
          <select
            value={filterSessionId}
            onChange={(e) => setFilterSessionId(e.target.value)}
            className="px-4 py-2 bg-warm-white border border-cream-dark/50 rounded-lg text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/30"
          >
            <option value="">כל הסדנאות</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.date}
              </option>
            ))}
          </select>

          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-cream-dark text-warm-brown rounded-lg hover:bg-cream-dark/80 transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            ייצוא CSV
          </button>
        </div>
      </div>

      {/* Registrations List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
          <p className="mt-4 text-warm-gray">טוען הרשמות...</p>
        </div>
      ) : registrations.length === 0 ? (
        <div className="text-center py-12 bg-warm-white rounded-2xl border border-cream-dark/30">
          <svg
            className="w-12 h-12 mx-auto text-warm-gray-light mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
          <p className="text-warm-gray">אין הרשמות עדיין</p>
        </div>
      ) : (
        <div className="space-y-4">
          {registrations.map((registration) => (
            <div
              key={registration.id}
              className="bg-warm-white rounded-xl border border-cream-dark/30 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Main Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-warm-brown text-lg">
                      {registration.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        registration.status === 'pending'
                          ? 'bg-amber-100 text-amber-700'
                          : registration.status === 'confirmed'
                          ? 'bg-sage/20 text-sage-dark'
                          : 'bg-warm-gray-light/20 text-warm-gray'
                      }`}
                    >
                      {registration.status === 'pending'
                        ? 'ממתין'
                        : registration.status === 'confirmed'
                        ? 'מאושר'
                        : registration.status}
                    </span>
                  </div>

                  <p className="text-warm-gray flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <a
                      href={`mailto:${registration.email}`}
                      className="hover:text-terracotta transition-colors"
                    >
                      {registration.email}
                    </a>
                  </p>

                  {registration.sessions && (
                    <p className="text-sm text-warm-gray-light flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                      {registration.sessions.date} | {registration.sessions.time}
                    </p>
                  )}

                  {registration.message && (
                    <div className="mt-3 p-3 bg-cream rounded-lg">
                      <p className="text-sm text-warm-gray-light mb-1">הערות:</p>
                      <p className="text-warm-gray">{registration.message}</p>
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <div className="text-sm text-warm-gray-light shrink-0">
                  {formatDate(registration.created_at)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
