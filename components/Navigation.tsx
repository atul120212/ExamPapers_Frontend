'use client';

import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import SearchInput from './SearchInput';

export default function Navigation() {
  const { user, isAuthenticated } = useAppStore();

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center font-bold text-lg">
              V
            </div>
            <span className="font-playfair font-bold text-lg">
              Exam<em className="not-italic text-primary">Vault</em>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <SearchInput />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.email}</span>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="px-3 py-2 text-sm font-medium hover:bg-accent rounded"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    // Handle logout
                  }}
                  className="px-3 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm font-medium hover:bg-accent rounded"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
