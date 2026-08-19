'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ThemeToggle from '../ThemeToggle';
import './index.scss';

/*
 * usePathname replaces react-router's NavLink, which applied the .active class
 * for us. It does not opt this route out of static rendering — the header still
 * prerenders to full HTML, and only its hydration JS ships.
 */
const NAV = [
  // "About" used to point at /about, which rendered the same component as /.
  // That route is now a 308 to /, so the link points at the canonical URL.
  { href: '/', label: 'About' },
  { href: '/work', label: 'Work Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <ul className="header">
      {NAV.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={`nav_link${pathname === href ? ' active' : ''}`}
            aria-current={pathname === href ? 'page' : undefined}
          >
            {label}
          </Link>
        </li>
      ))}
      <li>
        <ThemeToggle />
      </li>
    </ul>
  );
};

export default Header;
