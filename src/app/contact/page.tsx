import type { Metadata } from 'next';
import SocialIcons from '@/components/SocialIcons';
import './page.scss';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Priyanshi Taneja — LinkedIn, GitHub and email.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <div className="contact">
      <h1>Connect Here:</h1>
      <SocialIcons />
    </div>
  );
}
