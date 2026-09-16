import './index.scss';

/*
 * Replaces SkillsList, a fixed 50px strip of 18 icons.
 *
 * Every icon in that strip was aria-hidden, inside <footer
 * aria-label="Technologies"> — so a screen reader announced a named landmark
 * containing nothing at all. It also advertised Vue and Shopify, which appear
 * nowhere else on the site, alongside "terminal" and "code-branch" glyphs that
 * name no technology. The component still exists at src/components/SkillsList
 * and is simply no longer mounted; this is the readable, indexable version.
 *
 * The list is the "experienced" set, not everything ever touched. A long list
 * reads as padding; a short one reads as a claim.
 */
const TECHNOLOGIES = [
  'TypeScript',
  'React',
  'Next.js',
  'GraphQL',
  'Generative AI',
  'RAG',
  'Nx',
  'TanStack Query',
  'Tailwind CSS',
  'SCSS',
  'Accessibility (WCAG)',
  'Web performance',
];

/*
 * No headings in here, deliberately. <footer> is a contentinfo landmark on its
 * own (it is nested in a div, not in a sectioning element, so the landmark
 * still applies), which satisfies axe's `region` rule without adding a heading
 * that every page's heading order would then have to accommodate.
 */
const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer__group">
      <p className="site-footer__label" id="footer-tech">
        Technologies
      </p>
      <ul className="site-footer__list" aria-labelledby="footer-tech">
        {TECHNOLOGIES.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>

    <p className="site-footer__colophon">
      Built with Next.js and hand-written SCSS. No UI framework.{' '}
      <a
        href="https://github.com/priyanshitaneja/portfolio-react"
        aria-label="Source on GitHub (opens in a new tab)"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source
      </a>
      .
    </p>
  </footer>
);

export default Footer;
