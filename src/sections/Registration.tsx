export function Registration() {
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
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-warm-brown mb-2"
              >
                שם מלא
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                className="block w-full px-5 py-4 bg-warm-white border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200"
                placeholder="שם מלא"
              />
            </div>

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
                name="email"
                autoComplete="email"
                className="block w-full px-5 py-4 bg-warm-white border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200"
                placeholder="כתובת אימייל"
              />
            </div>

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
                rows={4}
                className="block w-full px-5 py-4 bg-warm-white border border-cream-dark/50 rounded-xl text-warm-brown placeholder-warm-gray-light focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all duration-200 resize-none"
                placeholder="שאלות, בקשות מיוחדות או תאריכים מועדפים"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-terracotta text-warm-white font-medium rounded-full hover:bg-terracotta-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              שליחת פרטים
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
