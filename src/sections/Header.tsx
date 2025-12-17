export function Header() {
  return (
    <header className="px-6 py-5 bg-warm-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-cream-dark/50">
      <div className="max-w-4xl mx-auto text-center">
        <a
          href="/"
          className="inline-block group"
        >
          <span className="font-serif text-2xl md:text-3xl font-semibold text-warm-brown tracking-wide group-hover:text-terracotta transition-colors duration-300">
            סדנאות יצירה
          </span>
          <span className="block text-sm text-warm-gray-light mt-0.5 font-light tracking-wide">
            סדנאות קטנות עם ליווי אישי
          </span>
        </a>
      </div>
    </header>
  )
}
