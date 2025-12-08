'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
export default function Navs() {
  const pathname = usePathname();

  const linkBase =
    'px-4 py-2 rounded-lg text-sm font-medium border shadow-sm transition active:scale-[0.98]';
  const inactive =
    'bg-white/80 text-gray-800 border-gray-300 hover:bg-white hover:shadow-md hover:border-gray-400';
  const active =
    'bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600';
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <Link
        href="/"
        className={`${linkBase} ${pathname === '/' ? active : inactive}`}
      >
        Home
      </Link>
      <Link
        href="/sort"
        className={`${linkBase} ${pathname === '/sort' ? active : inactive}`}
      >
        Sorting
      </Link>
      <Link
        href="/search"
        className={`${linkBase} ${
          pathname.startsWith('/search') ? active : inactive
        }`}
      >
        Searching
      </Link>
      <Link
        href="/algo"
        className={`${linkBase} ${
          pathname.startsWith('/algo') ? active : inactive
        }`}
      >
        DP&Greedy
      </Link>
    </div>
  );
}
