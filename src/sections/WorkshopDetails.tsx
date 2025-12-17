export function WorkshopDetails() {
  const details = [
    {
      title: 'עבודה מעשית',
      description: 'תעבדו בעצמכם, ואני כאן כדי לעזור כשצריך.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
        </svg>
      ),
    },
    {
      title: 'קבוצה קטנה',
      description: 'בקבוצה קטנה של 6–8 משתתפים, עם זמן לשאלות ויחס אישי.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      title: 'לוקחים הביתה',
      description: 'כל מה שתיצרו נשאר אצלכם לקחת הביתה.',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="px-6 py-20 md:py-28 bg-cream">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-dusty-rose font-medium text-sm tracking-widest uppercase">
            על הסדנה
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-warm-brown mt-3">
            מה קורה בסדנה
          </h2>
          <p className="mt-4 text-warm-gray max-w-xl mx-auto leading-relaxed">
            סדנה של כמה שעות, להתנסות, ליצור וללמוד בקצב שלכם, בלי לחץ.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {details.map((item) => (
            <article
              key={item.title}
              className="group bg-warm-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-cream-dark/30"
            >
              <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center text-terracotta mb-5 group-hover:bg-terracotta/10 transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl font-semibold text-warm-brown mb-2">
                {item.title}
              </h3>
              <p className="text-warm-gray leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
