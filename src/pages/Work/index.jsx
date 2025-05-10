import { Collapse, Timeline } from "antd";
import "./index.scss";

const Work = () => {
  return (
    <div className='work'>
      <Timeline
        mode='left'
        reverse={true}
        pending='...'
        items={[
          {
            label: "2020",
            color: "#875c3e",
            children: (
              <>
                <p>GRADUATION</p>
                <p>Jaypee Institute of Information Technology</p>
              </>
            ),
          },
          {
            label: "April 2020",
            color: "#875c3e",
            children: <p>Frontend Development Intern @ ORISERVE</p>,
          },
          {
            label: "August 2020",
            color: "#875c3e",
            children: <p>Junior Software Engineer @ ORISERVE</p>,
          },
          {
            label: "April 2021",
            color: "#875c3e",
            children: (
              <Collapse
                size='small'
                ghost={true}
                className='collapse'
                items={[
                  {
                    key: "1",
                    label: "Software Engineer @ ORISERVE",
                    children: (
                      <>
                        <p>
                          &#8226; Engineered different components &
                          functionalities for different brands, including the
                          implementation of an in-chat food ordering system for
                          Air Arabia (UAE), Vi, and other clients.
                        </p>
                        <p>
                          &#8226; Created a multilingual chatbot for Ikea in
                          Qatar, UAE, and Egypt, focusing on enhancing customer
                          experience and driving up-sell and cross-sell
                          opportunities. The chatbot implementation included
                          contextual triggers, resulting in an impressive 8.75%
                          increase in cart value.
                        </p>
                        <p>
                          &#8226; Led the end-to-end development and deployment
                          of the highly successful omnichannel Royal Enfield
                          Meteor chatbot, driving an outstanding increase in
                          visitor to lead conversion from 5.31% to an impressive
                          33%. Additionally, drove the development of the Bajaj
                          Auto chatbot, resulting in a remarkable increase in
                          lead conversions by over 14 times.
                        </p>
                        <p>
                          &#8226; Revamped and deployed cutting-edge
                          Conversational AdBots for Reliant Energy,
                          revolutionizing the advertising landscape with
                          personalized and interactive experiences that
                          captivated users.
                        </p>
                        <p>
                          &#8226; Streamlined chatbot performance by optimizing
                          bundle size and redesigning the workflow, resulting in
                          swift loading times and an enhanced user experience.
                        </p>
                        <p>
                          &#8226; Implemented A/B experiments to boost the
                          conversion rate by 5 points and reduce the churn rate
                          by 17 points, driving increased customer retention.
                        </p>
                        <p>
                          &#8226; Constructed modules for efficient extraction
                          of bot metrics, facilitating comprehensive reporting
                          and analysis of key performance indicators.
                        </p>
                        <p>
                          &#8226; Crafted the{" "}
                          <a
                            href='https://www.oriserve.com/'
                            target='_blank'
                            rel='noreferrer'>
                            Oriserve
                          </a>{" "}
                          website using WordPress,ensuring an engaging and
                          visually appealing online presence for the company.
                        </p>
                      </>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            label: "June 2022",
            color: "#875c3e",
            children: (
              <>
                <Collapse
                  size='small'
                  ghost={true}
                  className='collapse'
                  items={[
                    {
                      key: "1",
                      label: "UI Developer @ ANATTA",
                      children: (
                        <>
                          <p>
                            &#8226; Single-handedly developed the optimised
                            website of Beeya Wellness & delivered the
                            pixel-perfect product with smooth cross-country
                            collaboration. Implemented accessibility best
                            practices, resulting in WCAG-compliant design and
                            enhanced user experience for all.
                          </p>
                          <p>
                            &#8226; Achieved pixel-perfect implementation of the
                            Aventon website, ensuring a visually stunning and
                            polished user experience.
                          </p>
                          <p>
                            &#8226; Executed a ground-up reimplementation of the
                            MGemi codebase, introducing latest coding practices
                            and advanced strategies to achieve significant
                            enhancements in web performance, delivering faster
                            page load times and an exceptional user experience.
                          </p>
                        </>
                      ),
                    },
                  ]}
                />
              </>
            ),
          },
          {
            label: "August 2023",
            color: "#875c3e",
            children: (
              <Collapse
                size='small'
                ghost={true}
                className='collapse'
                items={[
                  {
                    key: "1",
                    label: "Software Development Engineer L3 @NOVO",
                    children: (
                      <>
                        <p>
                          &#8226; Revamped the Zendesk widget, improving its
                          average performance by 63.225%, enhancing support
                          workflows and responsiveness.
                        </p>
                        <p>
                          &#8226; Enhanced the Admin Dashboard with UI/UX
                          refinements and converted major modules to TypeScript,
                          improving performance by 30% and delivering a clean,
                          accessible interface without relying on formal design
                          handoff.
                        </p>
                        <p>
                          &#8226; Developed the Novo Billing Dashboard from
                          scratch, implementing detailed usage tracking, plan
                          upgrades, and payments visibility.
                        </p>
                      </>
                    ),
                  },
                ]}
              />
            ),
          },
          {
            label: "October 2024 - Present",
            color: "#875c3e",
            children: (
              <>
                <Collapse
                  size='small'
                  ghost={true}
                  className='collapse'
                  items={[
                    {
                      key: "1",
                      label: "Software Development Engineer II @NOVO",
                      children: (
                        <>
                          <p>
                            &#8226; Leading the development of Novo Invoice
                            Premium, a customizable invoicing solution aimed at
                            improving cash-flow visibility for SMBs. Designed
                            and implemented auto-reconciliation and real-time
                            payment tracking features to address over 50% of
                            Zendesk tickets related to fund availability and
                            payout confusion.
                          </p>
                          <p>
                            &#8226; Built and launched the Novo Credit Card web
                            experience end-to-end with React & TypeScript,
                            including card management, real-time transactions,
                            and in-app support features which achieved a ~83%
                            approval rate.
                          </p>
                          <p>
                            &#8226; Ensured keyboard accessibility and
                            responsive design across all new internal tools,
                            driving inclusivity and smoother mobile usability.
                          </p>
                          <p>
                            &#8226; Actively led web accessibility fixes and
                            initiated security alert cleanups (Dependabot
                            vulnerabilities and Sentry error monitoring),
                            promoting long-term maintainability and improved
                            stability.
                          </p>
                        </>
                      ),
                    },
                  ]}
                />
              </>
            ),
          },
          {
            label: "",
            children: "",
            color: "#875c3e",
          },
        ]}
      />
    </div>
  );
};

export default Work;
