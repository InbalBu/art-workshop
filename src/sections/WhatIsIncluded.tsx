import whatIsIncludedImage from '../assets/images/whatIsIncluded.jpeg'

export function WhatIsIncluded() {
  const inclusions = [
    {
      text: 'כל החומרים והכלים שתצטרכו במקום',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.39m3.421 3.415a3 3 0 10-5.043-3.415m5.043 3.415L17.25 6.75a2.25 2.25 0 00-2.16-2.87 2.25 2.25 0 00-2.16 2.87l.39 1.3" />
        </svg>
      ),
    },
    {
      text: 'תה, קפה ונשנושים קלים',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
      ),
    },
    {
      text: 'דף הנחיות שיעזור לכם להמשיך בבית',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      text: 'כל מה שתיצרו נשאר אצלכם לקחת הביתה',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="px-6 py-20 md:py-28 bg-warm-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-dusty-rose/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-sage-dark font-medium text-sm tracking-widest uppercase">
              הכל כלול
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-warm-brown mt-3">
              מה כלול
            </h2>

            <ul className="mt-8 space-y-5">
              {inclusions.map((item) => (
                <li key={item.text} className="flex items-start gap-4 group">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-cream flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-warm-white transition-all duration-300">
                    {item.icon}
                  </span>
                  <span className="text-warm-gray leading-relaxed pt-2">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-dusty-rose/30 rounded-full" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-sage/30 rounded-full" />
              <img
                src={whatIsIncludedImage}
                alt="אווירה חמה ומזמינה בסדנה"
                className="rounded-3xl shadow-lg w-full aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
