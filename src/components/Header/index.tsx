'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './index.scss';

/*
 * usePathname replaces react-router's NavLink, which applied the .active class
 * for us. It does not opt this route out of static rendering — the header
 * still prerenders to full HTML, and only its hydration JS ships.
 */
const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/lab', label: 'Lab' },
  { href: '/contact', label: 'Contact' },
];

/*
 * "About" pointing at / is gone. It described a page that did not exist: the
 * route rendered the same component as the homepage, and /about is a 308 to /.
 * The wordmark is the way home now, which is what a reader expects anyway.
 */
const Header = () => {
  const pathname = usePathname();
  const atHome = pathname === '/';

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Link
          href="/"
          className="site-header__wordmark"
          aria-current={atHome ? 'page' : undefined}
        >
          Priyanshi Taneja
        </Link>

        <nav aria-label="Main">
          <ul className="site-header__nav">
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
