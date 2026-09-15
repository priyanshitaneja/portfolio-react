import Designation from '@/components/Designation';
import SocialIcons from '@/components/SocialIcons';

import './page.css';

export default function Home() {
  return (
    <div className="homepage_wrapper">
      <div className="homepage">
        <section>
          <Designation />
          <SocialIcons />
        </section>
      </div>
    </div>
  );
}
