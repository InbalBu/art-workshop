/**
 * Admin Login Page - התחברות למנהל
 */

import { useState } from 'react'
import { supabase } from '../lib/supabase'

type AdminLoginProps = {
  onLogin: () => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('אימייל או סיסמה שגויים')
      setLoading(false)
    } else {
      onLogin()
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="bg-warm-white rounded-2xl border border-cream-dark/30 p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl font-semibold text-warm-brown">
              כניסת מנהל
            </h1>
            <p className="text-warm-gray-light text-sm mt-2">
              הזינו את פרטי ההתחברות
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-warm-brown mb-2"
              >
                אימייל
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-4 py-3 bg-cream border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-warm-brown mb-2"
              >
                סיסמה
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-3 bg-cream border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-dusty-rose/20 border border-dusty-rose/30 rounded-xl text-warm-brown text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-terracotta text-warm-white font-medium rounded-full hover:bg-terracotta-dark transition-all duration-300 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'מתחבר...' : 'התחברות'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-warm-gray-light hover:text-terracotta transition-colors"
            >
              ← חזרה לאתר
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
