import { useEffect, useState } from 'react'
import { supabase, type Session } from '../lib/supabase'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function Registration() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    session_id: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch available sessions
  useEffect(() => {
    async function fetchSessions() {
      const { data } = await supabase
        .from('sessions')
        .select('*')
        .eq('status', 'active')
        .gt('seats_left', 0)
        .order('created_at', { ascending: true })

      if (data) setSessions(data)
    }
    fetchSessions()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus('error')
      setErrorMessage('נא למלא שם ואימייל')
      return
    }

    try {
      // If a session is selected, check availability and update seats
      if (formData.session_id) {
        // Get current session data
        const { data: sessionData, error: sessionError } = await supabase
          .from('sessions')
          .select('seats_left')
          .eq('id', formData.session_id)
          .single()

        if (sessionError || !sessionData) {
          throw new Error('לא הצלחנו למצוא את הסדנה')
        }

        if (sessionData.seats_left <= 0) {
          setStatus('error')
          setErrorMessage('מצטערים, הסדנה התמלאה. נסו לבחור מועד אחר.')
          return
        }

        // Reduce seats_left by 1
        const { error: updateError } = await supabase
          .from('sessions')
          .update({ seats_left: sessionData.seats_left - 1 })
          .eq('id', formData.session_id)

        if (updateError) {
          throw new Error('לא הצלחנו לעדכן את מספר המקומות')
        }
      }

      // Insert registration
      const { error: insertError } = await supabase.from('registrations').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim() || null,
        session_id: formData.session_id || null,
      })

      if (insertError) {
        throw new Error('לא הצלחנו לשמור את הפרטים')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '', session_id: '' })
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'משהו השתבש, נסו שוב')
    }
  }

  // Success state
  if (status === 'success') {
    return (
      <section id="registration" className="px-6 py-20 md:py-28 bg-warm-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-dusty-rose/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-sage/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-xl mx-auto relative">
          <div className="bg-cream rounded-3xl p-10 md:p-14 shadow-sm border border-cream-dark/30 text-center">
            <div className="w-16 h-16 mx-auto bg-sage/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-sage-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-warm-brown mb-4">
              תודה רבה!
            </h2>
            <p className="text-warm-gray leading-relaxed mb-6">
              קיבלנו את הפרטים שלך ונחזור אליך בהקדם לתיאום.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="text-terracotta hover:text-terracotta-dark font-medium transition-colors"
            >
              רוצה להירשם למישהו נוסף?
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="registration" className="px-6 py-20 md:py-28 bg-warm-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-dusty-rose/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-sage/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-dusty-rose font-medium text-sm tracking-widest uppercase">
            יצירת קשר
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-warm-brown mt-3">
            רוצים להשאיר פרטים?
          </h2>
          <p className="mt-4 text-warm-gray leading-relaxed">
            השאירו פרטים ונחזור אליכם לתיאום סדנה.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-cream rounded-3xl p-8 md:p-10 shadow-sm border border-cream-dark/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-warm-brown mb-2"
              >
                שם מלא <span className="text-terracotta">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className="block w-full px-5 py-4 bg-warm-white border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200"
                placeholder="שם מלא"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-warm-brown mb-2"
              >
                אימייל <span className="text-terracotta">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="block w-full px-5 py-4 bg-warm-white border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200"
                placeholder="כתובת אימייל"
              />
            </div>

            {/* Session selector */}
            {sessions.length > 0 && (
              <div>
                <label
                  htmlFor="session_id"
                  className="block text-sm font-medium text-warm-brown mb-2"
                >
                  בחירת מועד{' '}
                  <span className="font-normal text-warm-gray-light">(לא חובה)</span>
                </label>
                <select
                  id="session_id"
                  name="session_id"
                  value={formData.session_id}
                  onChange={handleChange}
                  className="block w-full px-5 py-4 bg-warm-white border border-cream-dark/50 rounded-xl text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200"
                >
                  <option value="">אשמח לתאם בהמשך</option>
                  {sessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.date} | {session.time} (נשארו {session.seats_left} מקומות)
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-warm-brown mb-2"
              >
                הערות{' '}
                <span className="font-normal text-warm-gray-light">(לא חובה)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="block w-full px-5 py-4 bg-warm-white border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200 resize-none"
                placeholder="שאלות, בקשות מיוחדות או תאריכים מועדפים"
              />
            </div>

            {/* Error message */}
            {status === 'error' && (
              <div className="p-4 bg-dusty-rose/20 border border-dusty-rose/30 rounded-xl text-warm-brown text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full px-8 py-4 bg-terracotta text-warm-white font-medium rounded-full hover:bg-terracotta-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {status === 'submitting' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  שולח...
                </span>
              ) : (
                'שליחת פרטים'
              )}
            </button>

            <p className="text-center text-sm text-warm-gray-light pt-2">
              התשלום מתבצע במקום או בביט · אין התחייבות
            </p>
          </form>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-warm-gray-light">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            קבוצות קטנות
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ליווי אישי
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ללא ידע קודם
          </span>
        </div>
      </div>
    </section>
  )
}
