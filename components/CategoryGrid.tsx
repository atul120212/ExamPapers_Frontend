'use client';

import Link from 'next/link';

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-24 bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* School Boards - Featured */}
          <Link
            href="/boards/school"
            className="group md:col-span-2 p-8 rounded-lg border-2 border-gold bg-surface hover:bg-surface-top transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-5xl mb-6">🏫</div>
                <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-gold transition-colors">School Boards</h3>
                <p className="text-muted-foreground">CBSE, ICSE, UP, and all State Boards<br/>(Class 9-12)</p>
              </div>
              <div className="text-4xl group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </Link>

          {/* Universities */}
          <Link
            href="/boards/university"
            className="group p-8 rounded-lg border-2 border-gold/30 bg-surface hover:border-gold hover:bg-surface-top transition-all"
          >
            <div className="text-5xl mb-6">🎓</div>
            <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-gold transition-colors">Universities</h3>
            <p className="text-muted-foreground">AKTU, DU, MU, B.Tech, BCA, MBA,<br/>and more</p>
          </Link>

          {/* Entrance Exams */}
          <Link
            href="/boards/entrance"
            className="group p-8 rounded-lg border-2 border-gold/30 bg-surface hover:border-gold hover:bg-surface-top transition-all"
          >
            <div className="text-5xl mb-6">🏆</div>
            <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-gold transition-colors">Entrance Exams</h3>
            <p className="text-muted-foreground">JEE Main, NEET, GATE, CAT, UPSC,<br/>and more</p>
          </Link>

          {/* Competitive Exams */}
          <Link
            href="/boards/competitive"
            className="group p-8 rounded-lg border-2 border-gold/30 bg-surface hover:border-gold hover:bg-surface-top transition-all"
          >
            <div className="text-5xl mb-6">⭐</div>
            <h3 className="font-bold text-2xl text-white mb-2 group-hover:text-gold transition-colors">Competitive Exams</h3>
            <p className="text-muted-foreground">SSC, Banking, Railway, and government<br/>recruitment exams</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
