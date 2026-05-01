import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink-mid via-ink to-ink-soft py-20 sm:py-32">
      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-gold rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal rounded-full blur-3xl opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 px-4 py-2 rounded-full mb-6 w-fit mx-auto">
          <span className="inline-block w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wide text-gold">Welcome to ExamVault</span>
        </div>

        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Your Ultimate Archive of{' '}
          <em className="not-italic text-gold">Exam Papers</em>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Access a comprehensive collection of exam papers from schools and colleges across India. Download, search, and prepare for your exams with ease.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#papers"
            className="px-8 py-3 bg-gold text-ink font-bold rounded hover:bg-gold-dim transition-colors"
          >
            Browse Papers
          </Link>
          <Link
            href="/upload"
            className="px-8 py-3 border-2 border-gold/30 text-gold font-bold rounded hover:bg-gold/10 transition-colors"
          >
            Upload Paper
          </Link>
        </div>
      </div>
    </section>
  );
}
