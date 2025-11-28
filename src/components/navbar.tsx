'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const routes = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      active: pathname === '/dashboard',
    },
    {
      href: '/learn/chat',
      label: 'AI Tutor',
      active: pathname?.startsWith('/learn/chat'),
    },
    {
      href: '/learn/vocabulary',
      label: 'Vocabulary',
      active: pathname?.startsWith('/learn/vocabulary'),
    },
    {
      href: '/learn/quiz',
      label: 'Quizzes',
      active: pathname?.startsWith('/learn/quiz'),
    },
  ];

  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold">iLapp</span>
        </Link>
        <nav className="ml-6 flex items-center space-x-4 lg:space-x-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                route.active
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4" />
      </div>
    </header>
  );
}
