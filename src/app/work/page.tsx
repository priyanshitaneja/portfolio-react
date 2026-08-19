import './page.scss';

/*
 * Was an antd <Timeline> of <Collapse> panels. Now an ordered list of
 * <details>/<summary>, which gets keyboard and screen-reader support from the
 * platform and needs no JavaScript at all — this route ships zero page JS.
 *
 * The source array was oldest-first with antd's `reverse` prop flipping it at
 * render time; the markup below is simply written newest-first instead.
 * Copy is unchanged throughout.
 */

export default function Work() {
  return (
    <div className="work">
      <ol className="timeline">
        <li className="timeline__item timeline__item--pending">
          <div className="timeline__label" />
          <div className="timeline__content" aria-hidden="true">
            &hellip;
          </div>
        </li>

        <li className="timeline__item">
          <time className="timeline__label">October 2024 - Present</time>
          <div className="timeline__content">
            <details className="collapse">
              <summary>Software Development Engineer II @NOVO</summary>
              <div className="collapse__body">
                <p>
                  &#8226; Leading the development of Novo Invoice Premium, a
                  customizable invoicing solution aimed at improving cash-flow
                  visibility for SMBs. Designed and implemented
                  auto-reconciliation and real-time payment tracking features to
                  address over 50% of Zendesk tickets related to fund
                  availability and payout confusion.
                </p>
                <p>
                  &#8226; Built and launched the Novo Credit Card web experience
                  end-to-end with React &amp; TypeScript, including card
                  management, real-time transactions, and in-app support features
                  which achieved a ~83% approval rate.
                </p>
                <p>
                  &#8226; Ensured keyboard accessibility and responsive design
                  across all new internal tools, driving inclusivity and smoother
                  mobile usability.
                </p>
                <p>
                  &#8226; Actively led web accessibility fixes and initiated
                  security alert cleanups (Dependabot vulnerabilities and Sentry
                  error monitoring), promoting long-term maintainability and
                  improved stability.
                </p>
              </div>
            </details>
          </div>
        </li>

        <li className="timeline__item">
          <time className="timeline__label">August 2023</time>
          <div className="timeline__content">
            <details className="collapse">
              <summary>Software Development Engineer L3 @NOVO</summary>
              <div className="collapse__body">
                <p>
                  &#8226; Revamped the Zendesk widget, improving its average
                  performance by 63.225%, enhancing support workflows and
                  responsiveness.
                </p>
                <p>
                  &#8226; Enhanced the Admin Dashboard with UI/UX refinements and
                  converted major modules to TypeScript, improving performance by
                  30% and delivering a clean, accessible interface without
                  relying on formal design handoff.
                </p>
                <p>
                  &#8226; Developed the Novo Billing Dashboard from scratch,
                  implementing detailed usage tracking, plan upgrades, and
                  payments visibility.
                </p>
              </div>
            </details>
          </div>
        </li>

        <li className="timeline__item">
          <time className="timeline__label">June 2022</time>
          <div className="timeline__content">
            <details className="collapse">
              <summary>UI Developer @ ANATTA</summary>
              <div className="collapse__body">
                <p>
                  &#8226; Single-handedly developed the optimised website of
                  Beeya Wellness &amp; delivered the pixel-perfect product with
                  smooth cross-country collaboration. Implemented accessibility
                  best practices, resulting in WCAG-compliant design and enhanced
                  user experience for all.
                </p>
                <p>
                  &#8226; Achieved pixel-perfect implementation of the Aventon
                  website, ensuring a visually stunning and polished user
                  experience.
                </p>
                <p>
                  &#8226; Executed a ground-up reimplementation of the MGemi
                  codebase, introducing latest coding practices and advanced
                  strategies to achieve significant enhancements in web
                  performance, delivering faster page load times and an
                  exceptional user experience.
                </p>
              </div>
            </details>
          </div>
        </li>

        <li className="timeline__item">
          <time className="timeline__label">April 2021</time>
          <div className="timeline__content">
            <details className="collapse">
              <summary>Software Engineer @ ORISERVE</summary>
              <div className="collapse__body">
                <p>
                  &#8226; Engineered different components &amp; functionalities
                  for different brands, including the implementation of an
                  in-chat food ordering system for Air Arabia (UAE), Vi, and
                  other clients.
                </p>
                <p>
                  &#8226; Created a multilingual chatbot for Ikea in Qatar, UAE,
                  and Egypt, focusing on enhancing customer experience and
                  driving up-sell and cross-sell opportunities. The chatbot
                  implementation included contextual triggers, resulting in an
                  impressive 8.75% increase in cart value.
                </p>
                <p>
                  &#8226; Led the end-to-end development and deployment of the
                  highly successful omnichannel Royal Enfield Meteor chatbot,
                  driving an outstanding increase in visitor to lead conversion
                  from 5.31% to an impressive 33%. Additionally, drove the
                  development of the Bajaj Auto chatbot, resulting in a
                  remarkable increase in lead conversions by over 14 times.
                </p>
                <p>
                  &#8226; Revamped and deployed cutting-edge Conversational
                  AdBots for Reliant Energy, revolutionizing the advertising
                  landscape with personalized and interactive experiences that
                  captivated users.
                </p>
                <p>
                  &#8226; Streamlined chatbot performance by optimizing bundle
                  size and redesigning the workflow, resulting in swift loading
                  times and an enhanced user experience.
                </p>
                <p>
                  &#8226; Implemented A/B experiments to boost the conversion
                  rate by 5 points and reduce the churn rate by 17 points,
                  driving increased customer retention.
                </p>
                <p>
                  &#8226; Constructed modules for efficient extraction of bot
                  metrics, facilitating comprehensive reporting and analysis of
                  key performance indicators.
                </p>
                <p>
                  &#8226; Crafted the{' '}
                  <a
                    href="https://www.oriserve.com/"
                    target="_blank"
                    rel="noreferrer">
                    Oriserve
                  </a>{' '}
                  website using WordPress,ensuring an engaging and visually
                  appealing online presence for the company.
                </p>
              </div>
            </details>
          </div>
        </li>

        <li className="timeline__item">
          <time className="timeline__label">August 2020</time>
          <div className="timeline__content">
            <p>Junior Software Engineer @ ORISERVE</p>
          </div>
        </li>

        <li className="timeline__item">
          <time className="timeline__label">April 2020</time>
          <div className="timeline__content">
            <p>Frontend Development Intern @ ORISERVE</p>
          </div>
        </li>

        <li className="timeline__item">
          <time className="timeline__label">2020</time>
          <div className="timeline__content">
            <p>GRADUATION</p>
            <p>Jaypee Institute of Information Technology</p>
          </div>
        </li>
      </ol>
    </div>
  );
}
