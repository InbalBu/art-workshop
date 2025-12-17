/**
 * Sessions Table Component - טבלת סדנאות
 *
 * Displays all sessions in a table format with actions:
 * - Edit: Opens edit form
 * - Toggle Status: Switches between active/inactive
 * - Delete: Removes the session
 */

import type { Session } from '../../lib/supabase'

type SessionsTableProps = {
  sessions: Session[]
  onEdit: (session: Session) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string, currentStatus: string) => void
}

export function SessionsTable({
  sessions,
  onEdit,
  onDelete,
  onToggleStatus,
}: SessionsTableProps) {
  return (
    <div className="bg-warm-white rounded-2xl border border-cream-dark/30 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-cream-dark/30">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-medium text-warm-brown">
                תאריך
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-warm-brown">
                שעה
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-warm-brown">
                מיקום
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-warm-brown">
                מקומות
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-warm-brown">
                סטטוס
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-warm-brown">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-dark/30">
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-cream/50 transition-colors">
                <td className="px-6 py-4 text-warm-brown">{session.date}</td>
                <td className="px-6 py-4 text-warm-gray">{session.time}</td>
                <td className="px-6 py-4 text-warm-gray">{session.location}</td>
                <td className="px-6 py-4">
                  <span className="text-warm-brown font-medium">
                    {session.seats_left}
                  </span>
                  <span className="text-warm-gray-light">
                    {' '}
                    / {session.max_seats}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleStatus(session.id, session.status)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      session.status === 'active'
                        ? 'bg-sage/20 text-sage-dark hover:bg-sage/30'
                        : 'bg-warm-gray-light/20 text-warm-gray hover:bg-warm-gray-light/30'
                    }`}
                  >
                    {session.status === 'active' ? 'פעיל' : 'לא פעיל'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(session)}
                      className="p-2 text-warm-gray hover:text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors"
                      title="עריכה"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(session.id)}
                      className="p-2 text-warm-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="מחיקה"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-cream-dark/30">
        {sessions.map((session) => (
          <div key={session.id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-warm-brown">{session.date}</p>
                <p className="text-sm text-warm-gray">{session.time}</p>
              </div>
              <button
                onClick={() => onToggleStatus(session.id, session.status)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  session.status === 'active'
                    ? 'bg-sage/20 text-sage-dark'
                    : 'bg-warm-gray-light/20 text-warm-gray'
                }`}
              >
                {session.status === 'active' ? 'פעיל' : 'לא פעיל'}
              </button>
            </div>

            <div className="text-sm text-warm-gray">
              <p>{session.location}</p>
              <p>
                מקומות: {session.seats_left} / {session.max_seats}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onEdit(session)}
                className="flex-1 px-4 py-2 text-sm text-terracotta border border-terracotta rounded-lg hover:bg-terracotta/10 transition-colors"
              >
                עריכה
              </button>
              <button
                onClick={() => onDelete(session.id)}
                className="px-4 py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                מחיקה
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
