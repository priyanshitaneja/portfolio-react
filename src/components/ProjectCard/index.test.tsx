import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import ProjectCard from './index';

/*
 * The cover branch is the part worth pinning. Every card currently passes an
 * imageUrl, so the placeholder path is unreachable in the app — which is
 * exactly why a regression there would go unnoticed until someone adds a card
 * without one and <Image> throws for a missing src.
 */

describe('ProjectCard', () => {
  it('renders a cover image named after the project', () => {
    render(<ProjectCard name="Pure Pilates" imageUrl="/images/pure-pilates.png" />);
    expect(screen.getByRole('img', { name: 'Pure Pilates' })).toBeDefined();
  });

  it('renders a decorative placeholder instead of an image when no cover is given', () => {
    const { container } = render(<ProjectCard name="Keeper" />);

    expect(screen.queryByRole('img')).toBeNull();
    const placeholder = container.querySelector('.project_card__cover--placeholder');
    expect(placeholder).not.toBeNull();
    /* Decorative, so it must not reach the accessibility tree with a fake name. */
    expect(placeholder?.getAttribute('aria-hidden')).toBe('true');
  });

  it('titles the card at h2 so it does not skip a level under the page h1', () => {
    /* h1 -> h3 is what axe's heading-order flags; /projects opens with an h1. */
    render(<ProjectCard name="MGemi" imageUrl="/x.png" />);
    expect(screen.getByRole('heading', { level: 2, name: 'MGemi' })).toBeDefined();
  });

  it('falls back to placeholder copy when name and description are absent', () => {
    render(<ProjectCard imageUrl="/x.png" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Project Name' })).toBeDefined();
    expect(screen.getByText('Project Description')).toBeDefined();
  });

  it('renders action links only for the urls it is given', () => {
    render(
      <ProjectCard name="Oriserve" imageUrl="/x.png" deployedUrl="https://example.com" />
    );
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute('href')).toBe('https://example.com');
  });
});
