import aboutImage from '../assets/images/about.jpeg'

export function About() {
  return (
    <section id="about" className="px-6 py-20 md:py-28 bg-warm-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <span className="text-sage-dark font-medium text-sm tracking-widest uppercase">
              הכירו אותנו
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-warm-brown mt-3">
              היוצרות מאחורי הסדנאות
            </h2>

            <div className="mt-6 space-y-4">
              <p className="text-warm-gray leading-relaxed">
                הסדנאות נולדו מתוך אהבה ליצירה, לחומר ולרגעים השקטים שקורים כשעובדים עם הידיים.
                <br />
                אנחנו, מיכל וריקי, יוצרות ומלמדות מתוך ניסיון בעבודה עם אנשים ובחיבור בין אומנות,
                תהליך וסקרנות.
              </p>

              <p className="text-warm-gray leading-relaxed">
                כל מפגש הוא הזדמנות לעצור לרגע, להתנסות בקצב אישי ולהיות בתוך תהליך -
                בלי לחץ, בלי צורך בידע קודם ובלי ציפייה לתוצאה "מושלמת".
                <br />
                העבודה בקבוצות קטנות מאפשרת ליווי אישי, שיחה וזמן אמיתי לכל משתתף.
              </p>

              <p className="text-warm-gray leading-relaxed">
                אנחנו מאמינות שיצירה היא קודם כל חוויה.
                <br />
                מקום להיות בו נוכחים, לגלות משהו חדש - ולצאת עם משהו שנוצר מהידיים ובלב.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-px bg-terracotta/40" />
              <span className="text-terracotta text-sm font-medium">בואו ליצור יחד</span>
            </div>
          </div>

          {/* About Image */}
          <div className="relative">
            <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-sage/20 rounded-full blur-xl -z-10" />
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-dusty-rose/20 rounded-full blur-xl -z-10" />
            <img
              src={aboutImage}
              alt="היוצרות מאחורי הסדנאות"
              className="rounded-2xl shadow-lg w-full aspect-square object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
