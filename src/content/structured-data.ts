import { CERTIFICATIONS, EDUCATION, PROFILE, SITE_URL } from './profile';
import { COMPANIES } from './companies';

/*
 * One Person node with a stable @id, referenced by every other node.
 *
 * Defining the person once and pointing at it with `@id` is what lets a search
 * engine merge these into a single entity. Repeating an inline Person object
 * on each page produces several unrelated people who happen to share a name.
 */
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const novo = COMPANIES[0];

export const homeGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: PROFILE.name,
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: PROFILE.name,
      url: `${SITE_URL}/`,
      jobTitle: PROFILE.jobTitle,
      description: PROFILE.positioning,
      email: `mailto:${PROFILE.email}`,
      sameAs: PROFILE.socials
        .filter((s) => s.id !== 'email')
        .map((s) => s.url),
      knowsAbout: PROFILE.knowsAbout,
      worksFor: {
        '@type': 'Organization',
        name: novo.name,
        url: novo.url,
        description: novo.context,
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: EDUCATION.institution,
      },
      hasCredential: CERTIFICATIONS.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        name: c.name,
        credentialCategory: 'certificate',
        recognizedBy: { '@type': 'Organization', name: c.issuer },
      })),
    },
  ],
};
