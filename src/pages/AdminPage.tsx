/**
 * Admin Page - ניהול סדנאות והרשמות
 *
 * This page allows the admin to:
 * - View, add, edit, delete sessions
 * - Toggle session status (active/inactive)
 * - View all registrations per session
 * - Export registrations to CSV
 */

import { useEffect, useState } from 'react'
import { supabase, type Session } from '../lib/supabase'
import { SessionsTable } from '../components/admin/SessionsTable'
import { SessionForm } from '../components/admin/SessionForm'
import { RegistrationsView } from '../components/admin/RegistrationsView'

// Type for registration with session info
export type RegistrationWithSession = {
  id: string
  session_id: string | null
  name: string
  email: string
  message: string | null
  created_at: string
  status: string
  sessions: {
    date: string
    time: string
  } | null
}

export function AdminPage() {
  // State for sessions list
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  // State for editing/adding sessions
  const [editingSession, setEditingSession] = useState<Session | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // State for active tab
  const [activeTab, setActiveTab] = useState<'sessions' | 'registrations'>('sessions')

  // Fetch all sessions on mount
  useEffect(() => {
    fetchSessions()
  }, [])

  // Fetch sessions from Supabase
  async function fetchSessions() {
    setLoading(true)
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching sessions:', error)
    } else if (data) {
      setSessions(data)
    }
    setLoading(false)
  }

  // Add new session
  async function handleAddSession(sessionData: Omit<Session, 'id' | 'created_at'>) {
    const { error } = await supabase.from('sessions').insert({
      ...sessionData,
      seats_left: sessionData.max_seats, // New session starts with all seats available
    })

    if (error) {
      console.error('Error adding session:', error)
      alert('שגיאה בהוספת סדנה')
    } else {
      setShowAddForm(false)
      fetchSessions()
    }
  }

  // Update existing session
  async function handleUpdateSession(id: string, updates: Partial<Session>) {
    // If max_seats is being reduced, adjust seats_left accordingly
    if (updates.max_seats !== undefined) {
      const currentSession = sessions.find(s => s.id === id)
      if (currentSession) {
        const seatsTaken = currentSession.max_seats - currentSession.seats_left
        const newSeatsLeft = Math.max(0, updates.max_seats - seatsTaken)
        updates.seats_left = newSeatsLeft
      }
    }

    const { error } = await supabase
      .from('sessions')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error('Error updating session:', error)
      alert('שגיאה בעדכון סדנה')
    } else {
      setEditingSession(null)
      fetchSessions()
    }
  }

  // Delete session
  async function handleDeleteSession(id: string) {
    if (!confirm('האם למחוק את הסדנה? פעולה זו תמחק גם את כל ההרשמות לסדנה.')) {
      return
    }

    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting session:', error)
      alert('שגיאה במחיקת סדנה')
    } else {
      fetchSessions()
    }
  }

  // Toggle session status
  async function handleToggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    await handleUpdateSession(id, { status: newStatus })
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-warm-white border-b border-cream-dark/30 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-2xl font-semibold text-warm-brown">
                ניהול סדנאות
              </h1>
              <p className="text-sm text-warm-gray-light mt-1">
                ניהול מועדים והרשמות
              </p>
            </div>
            <a
              href="/"
              className="text-terracotta hover:text-terracotta-dark transition-colors text-sm"
            >
              → חזרה לאתר
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-warm-white border-b border-cream-dark/30">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('sessions')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'sessions'
                  ? 'border-terracotta text-terracotta font-medium'
                  : 'border-transparent text-warm-gray hover:text-warm-brown'
              }`}
            >
              סדנאות
            </button>
            <button
              onClick={() => setActiveTab('registrations')}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === 'registrations'
                  ? 'border-terracotta text-terracotta font-medium'
                  : 'border-transparent text-warm-gray hover:text-warm-brown'
              }`}
            >
              הרשמות
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'sessions' ? (
          <div className="space-y-6">
            {/* Add Session Button */}
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-xl text-warm-brown">
                כל הסדנאות ({sessions.length})
              </h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-terracotta text-warm-white font-medium rounded-full hover:bg-terracotta-dark transition-all duration-300 shadow-sm hover:shadow-md"
              >
                + סדנה חדשה
              </button>
            </div>

            {/* Add Session Form (Modal-like) */}
            {showAddForm && (
              <SessionForm
                onSubmit={handleAddSession}
                onCancel={() => setShowAddForm(false)}
              />
            )}

            {/* Edit Session Form */}
            {editingSession && (
              <SessionForm
                session={editingSession}
                onSubmit={(data) => handleUpdateSession(editingSession.id, data)}
                onCancel={() => setEditingSession(null)}
              />
            )}

            {/* Sessions Table */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-2 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
                <p className="mt-4 text-warm-gray">טוען סדנאות...</p>
              </div>
            ) : sessions.length === 0 ? (
              <div className="text-center py-12 bg-warm-white rounded-2xl border border-cream-dark/30">
                <p className="text-warm-gray mb-4">אין סדנאות עדיין</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="text-terracotta hover:text-terracotta-dark font-medium"
                >
                  הוסיפו את הסדנה הראשונה
                </button>
              </div>
            ) : (
              <SessionsTable
                sessions={sessions}
                onEdit={setEditingSession}
                onDelete={handleDeleteSession}
                onToggleStatus={handleToggleStatus}
              />
            )}
          </div>
        ) : (
          <RegistrationsView sessions={sessions} />
        )}
      </main>
    </div>
  )
}
