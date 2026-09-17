import './index.scss';

/*
 * In-page anchors, and therefore no longer a client component.
 *
 * The nav used to call usePathname to mark the active route, which made the
 * header the only thing in the layout shipping hydration JS. With one document
 * there are no routes to be active on, so the hook goes and the header becomes
 * a server component.
 *
 * Deliberately not scroll-spying to highlight the current section: that needs
 * an IntersectionObserver, a client boundary and a decision about what
 * "current" means when two sections are on screen, in exchange for a
 * highlight nobody navigates by.
 */
const NAV = [
  { href: '#work', label: 'Work' },
  { href: '#lab', label: 'Lab' },
  { href: '#contact', label: 'Contact' },
];

const Header = () => (
  <header className="site-header">
    <div className="site-header__inner shell">
      <a href="#top" className="site-header__wordmark">
        Priyanshi Taneja
      </a>

      <nav aria-label="Sections">
        <ul className="site-header__nav">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="nav_link">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
