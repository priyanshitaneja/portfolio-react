import './index.scss';

interface Props {
  /** The small uppercase line above the heading. Never part of the
      accessible name — it is a label for the section, not the section. */
  eyebrow?: string;
  children: React.ReactNode;
  /** Heading level. Defaults to h2, which is the correct step under each
      page's single h1. */
  as?: 'h2' | 'h3';
  id?: string;
}

/*
 * Exists so heading order is structural rather than a thing to remember.
 * `heading-order` is a Lighthouse audit and an axe rule, and the way it breaks
 * is always the same: a section gets an eyebrow styled to look like a heading,
 * or a card's title is bumped a level to make it look right.
 */
const SectionHeading = ({ eyebrow, children, as = 'h2', id }: Props) => {
  const Tag = as;
  return (
    <div className="section-heading">
      {eyebrow ? (
        <p className="section-heading__eyebrow u-caps" aria-hidden="true">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="section-heading__title" id={id}>
        {children}
      </Tag>
    </div>
  );
};

export default SectionHeading;
