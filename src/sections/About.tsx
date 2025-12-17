export function About() {
  return (
    <section id="about" className="px-6 py-20 md:py-28 bg-warm-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <span className="text-sage-dark font-medium text-sm tracking-widest uppercase">
              הכירו אותי
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-warm-brown mt-3">
              מי מעבירה את הסדנאות
            </h2>

            <div className="mt-6 space-y-4">
              <p className="text-warm-gray leading-relaxed">
                הסדנאות מועברות על ידי מנחה עם ניסיון בהוראה ובעבודה עם קבוצות קטנות.
                המפגשים בנויים כך שכל משתתף מקבל ליווי אישי, בלי לחץ ובלי צורך בידע קודם.
              </p>
              <p className="text-warm-gray leading-relaxed">
                העבודה בקבוצה קטנה מאפשרת זמן לשאלות, שיחה והתנסות בקצב אישי.
                הדגש הוא על התהליך ולא על התוצאה.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-px bg-terracotta/40" />
              <span className="text-terracotta text-sm font-medium">בואו ליצור יחד</span>
            </div>
          </div>

          {/* Artistic placeholder with craft-inspired decoration */}
          <div className="relative">
            <div className="aspect-square bg-cream-dark rounded-2xl overflow-hidden shadow-lg">
              {/* Decorative craft elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <svg
                    className="w-20 h-20 mx-auto text-terracotta/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.39m3.421 3.415a3 3 0 10-5.043-3.415m5.043 3.415L17.25 6.75a2.25 2.25 0 00-2.16-2.87 2.25 2.25 0 00-2.16 2.87l.39 1.3"
                    />
                  </svg>
                  <p className="mt-4 text-warm-gray-light text-sm">תמונה תתווסף בקרוב</p>
                </div>
              </div>
            </div>
            {/* Decorative corner accent */}
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-sage/20 rounded-full blur-xl -z-10" />
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-dusty-rose/20 rounded-full blur-xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
