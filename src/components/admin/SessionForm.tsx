/**
 * Session Form Component - טופס הוספה/עריכת סדנה
 *
 * Used for both adding new sessions and editing existing ones.
 * If `session` prop is provided, it's in edit mode.
 */

import { useState } from 'react'
import type { Session } from '../../lib/supabase'

type SessionFormProps = {
  session?: Session // If provided, we're editing
  onSubmit: (data: Omit<Session, 'id' | 'created_at'>) => void
  onCancel: () => void
}

export function SessionForm({ session, onSubmit, onCancel }: SessionFormProps) {
  const isEditing = !!session

  // Form state with defaults
  const [formData, setFormData] = useState({
    date: session?.date || '',
    time: session?.time || '',
    location: session?.location || '',
    max_seats: session?.max_seats || 8,
    status: session?.status || 'active',
    seats_left: session?.seats_left || 8,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.date.trim() || !formData.time.trim() || !formData.location.trim()) {
      alert('נא למלא את כל השדות')
      return
    }

    if (formData.max_seats < 1) {
      alert('מספר המקומות חייב להיות לפחות 1')
      return
    }

    onSubmit(formData)
  }

  return (
    <div className="bg-warm-white rounded-2xl border border-cream-dark/30 p-6 shadow-sm">
      <h3 className="font-serif text-xl text-warm-brown mb-6">
        {isEditing ? 'עריכת סדנה' : 'סדנה חדשה'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Date Field */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-warm-brown mb-2"
          >
            תאריך <span className="text-terracotta">*</span>
          </label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="לדוגמה: שבת, 18 בינואר"
            className="block w-full px-4 py-3 bg-cream border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
          />
          <p className="text-xs text-warm-gray-light mt-1">
            כתבו את התאריך בפורמט שיוצג למשתתפים
          </p>
        </div>

        {/* Time Field */}
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-warm-brown mb-2"
          >
            שעות <span className="text-terracotta">*</span>
          </label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="לדוגמה: 10:00 – 13:00"
            className="block w-full px-4 py-3 bg-cream border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
          />
        </div>

        {/* Location Field */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-warm-brown mb-2"
          >
            מיקום <span className="text-terracotta">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="לדוגמה: תל אביב, רחוב הירקון 10"
            className="block w-full px-4 py-3 bg-cream border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
          />
        </div>

        {/* Max Seats Field */}
        <div>
          <label
            htmlFor="max_seats"
            className="block text-sm font-medium text-warm-brown mb-2"
          >
            מספר מקומות מקסימלי <span className="text-terracotta">*</span>
          </label>
          <input
            type="number"
            id="max_seats"
            name="max_seats"
            value={formData.max_seats}
            onChange={handleChange}
            min={1}
            max={50}
            className="block w-full px-4 py-3 bg-cream border border-cream-dark/50 rounded-xl text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
          />
          {isEditing && (
            <p className="text-xs text-warm-gray-light mt-1">
              נרשמו כבר: {session.max_seats - session.seats_left} משתתפים
            </p>
          )}
        </div>

        {/* Status Field (only for editing) */}
        {isEditing && (
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-warm-brown mb-2"
            >
              סטטוס
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full px-4 py-3 bg-cream border border-cream-dark/50 rounded-xl text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
            >
              <option value="active">פעיל - מוצג באתר</option>
              <option value="inactive">לא פעיל - מוסתר מהאתר</option>
            </select>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-terracotta text-warm-white font-medium rounded-full hover:bg-terracotta-dark transition-all duration-300 shadow-sm"
          >
            {isEditing ? 'שמירת שינויים' : 'הוספת סדנה'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-warm-gray border border-cream-dark rounded-full hover:bg-cream transition-all duration-300"
          >
            ביטול
          </button>
        </div>
      </form>
    </div>
  )
}
