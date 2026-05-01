import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 sm:py-24 lg:py-32">
      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-gold rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal rounded-full blur-3xl opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 border border-gold/50 px-4 py-2 rounded-full mb-8 w-fit">
          <span className="inline-block w-2 h-2 bg-gold rounded-full" />
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Live Vault: Class 9-12 & University</span>
        </div>

        {/* Main heading */}
        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight max-w-4xl">
          Your Ultimate Archive of{' '}
          <em className="not-italic text-gold">Exam Papers</em>.
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
          Access over 10,000+ previous year question papers, sample papers, and notes for all major
          Indian boards and universities. Completely free, organized, and high-quality.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Link
            href="#boards"
            className="group p-8 rounded-lg border-2 border-gold/30 bg-surface hover:border-gold hover:bg-surface-top transition-all"
          >
            <div className="text-4xl mb-4">🏫</div>
            <h3 className="font-bold text-xl text-white mb-2 group-hover:text-gold transition-colors">School Boards</h3>
            <p className="text-sm text-muted-foreground">CBSE, ICSE, UP, and all State Boards<br/>(Class 9-12)</p>
          </Link>

          <div className="p-8 rounded-lg border-2 border-gold/20 bg-surface-top">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="font-bold text-xl text-white mb-2">Universities</h3>
            <p className="text-sm text-muted-foreground">AKTU, DU, MU, B.Tech, BCA, MBA,<br/>and more</p>
          </div>

          <div className="p-8 rounded-lg border-2 border-gold/20 bg-surface-top">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="font-bold text-xl text-white mb-2">Entrance Exams</h3>
            <p className="text-sm text-muted-foreground">JEE Main, NEET, GATE, CAT, UPSC,<br/>and more</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-8 sm:gap-12">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-gold mb-1">10k+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Papers</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-gold mb-1">15+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Boards</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-gold mb-1">50k+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Downloads</div>
          </div>
        </div>
      </div>
    </section>
  );
}
