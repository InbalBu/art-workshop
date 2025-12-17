export function Footer() {
  return (
    <footer className="px-6 py-12 bg-cream border-t border-cream-dark/30">
      <div className="max-w-4xl mx-auto">
        {/* Main footer content */}
        <div className="text-center">
          {/* Logo/Brand */}
          <a href="/" className="inline-block group mb-6">
            <span className="font-serif text-2xl font-semibold text-warm-brown group-hover:text-terracotta transition-colors duration-300">
              סדנאות יצירה
            </span>
          </a>

          {/* Contact info */}
          <p className="text-warm-gray leading-relaxed">
            שאלות או בקשות? אפשר לכתוב ל־
            <a
              href="mailto:info@workshop.co.il"
              className="text-terracotta hover:text-terracotta-dark transition-colors duration-200 font-medium"
            >
              info@workshop.co.il
            </a>
            . נשמח לחזור אליכם בהקדם.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-12 h-px bg-cream-dark" />
            <svg
              className="w-5 h-5 text-dusty-rose/50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="w-12 h-px bg-cream-dark" />
          </div>

          {/* Bottom text */}
          <p className="text-sm text-warm-gray-light">
            נוצר באהבה · כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  )
}
