import { Collapse, Timeline } from "antd";
import "./index.scss";

const Work = () => {
  return (
    <div className="work">
      <Timeline
        mode="left"
        reverse={true}
        pending="..."
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
            children: (
              <>
                <p>Frontend Development Intern</p>
                <p>Oriserve</p>
              </>
            ),
          },
          {
            label: "August 2020",
            color: "#875c3e",
            children: (
              <>
                <p>Junior Software Engineer @ ORISERVE</p>
              </>
            ),
          },
          {
            label: "April 2021",
            color: "#875c3e",
            children: (
              <>
                <Collapse
                  size="small"
                  ghost={true}
                  className="collapse"
                  items={[
                    {
                      key: "1",
                      label: "Software Engineer @ ORISERVE",
                      children: (
                        <>
                          <p>
                            &#8226; Engineered different components &
                            functionalities for different brands, including the
                            implementation of an in-chat food ordering system
                            for Air Arabia (UAE), Vi, and other clients.
                          </p>
                          <p>
                            &#8226; Created a multilingual chatbot for Ikea in
                            Qatar, UAE, and Egypt, focusing on enhancing
                            customer experience and driving up-sell and
                            cross-sell opportunities. The chatbot implementation
                            included contextual triggers, resulting in an
                            impressive 8.75% increase in cart value.
                          </p>
                          <p>
                            &#8226; Led the end-to-end development and
                            deployment of the highly successful omnichannel
                            Royal Enfield Meteor chatbot, driving an outstanding
                            increase in visitor to lead conversion from 5.31% to
                            an impressive 33%. Additionally, drove the
                            development of the Bajaj Auto chatbot, resulting in
                            a remarkable increase in lead conversions by over 14
                            times.
                          </p>
                          <p>
                            &#8226; Revamped and deployed cutting-edge
                            Conversational AdBots for Reliant Energy,
                            revolutionizing the advertising landscape with
                            personalized and interactive experiences that
                            captivated users.
                          </p>
                          <p>
                            &#8226; Streamlined chatbot performance by
                            optimizing bundle size and redesigning the workflow,
                            resulting in swift loading times and an enhanced
                            user experience.
                          </p>
                          <p>
                            &#8226; Implemented A/B experiments to boost the
                            conversion rate by 5 points and reduce the churn
                            rate by 17 points, driving increased customer
                            retention.
                          </p>
                          <p>
                            &#8226; Constructed modules for efficient extraction
                            of bot metrics, facilitating comprehensive reporting
                            and analysis of key performance indicators.
                          </p>
                          <p>
                            &#8226; Crafted the{" "}
                            <a href="https://www.oriserve.com/">Oriserve</a>{" "}
                            website using WordPress,ensuring an engaging and
                            visually appealing online presence for the company.
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
            label: "June 2022",
            color: "#875c3e",
            children: (
              <>
                <Collapse
                  size="small"
                  ghost={true}
                  className="collapse"
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
