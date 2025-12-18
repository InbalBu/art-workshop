export function Hero() {
  return (
    <section className="px-6 py-20 md:py-32 bg-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-dusty-rose/20 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-sage/20 rounded-full blur-2xl" />

      <div className="max-w-4xl mx-auto relative">
        <div className="inline-block mb-6">
          <span className="text-terracotta font-medium text-sm tracking-widest uppercase">
            יצירה בידיים
          </span>
          <div className="h-px w-12 bg-terracotta/40 mt-2" />
        </div>

        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-warm-brown leading-tight">
          ללמוד משהו חדש, בקבוצה קטנה
        </h1>

        <p className="mt-8 text-lg md:text-xl text-warm-gray leading-relaxed max-w-2xl">
          סדנאות קטנות שבהן עובדים עם הידיים ויוצאים עם משהו שעשיתם בעצמכם.
          <br></br>
          אין צורך בניסיון קודם.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#registration"
            className="inline-flex items-center px-8 py-4 bg-terracotta text-warm-white font-medium rounded-full hover:bg-terracotta-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            לפרטים והרשמה
          </a>
          <a
            href="#about"
            className="inline-flex items-center px-8 py-4 bg-cream-dark text-warm-brown font-medium rounded-full hover:bg-cream-dark/80 transition-all duration-300"
          >
            קצת עלינו
          </a>
        </div>
      </div>
    </section>
  )
}
