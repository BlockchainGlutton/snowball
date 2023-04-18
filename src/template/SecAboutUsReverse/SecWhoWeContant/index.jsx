import { MobileView, BrowserView } from "react-device-detect";
const Span = () => <span></span>;

const SecWhoWeContant = () => {
  return (
    <div className="col-12 py-3">
      <div className="d-flex justify-content-center">
        <div className="who-we-contant">
          <div className="dream-dots" data-aos="fade-up">
            {Array(7)
              .fill()
              .map((element, key) => (
                <Span key={key} />
              ))}
          </div>
          <MobileView>
            <h2 data-aos="fade-up" style={{ color: "white" }}>
              Powerful Protection <br />
              For Launchpads
            </h2>
          </MobileView>
          <BrowserView>
            <h1 data-aos="fade-up" style={{ color: "white" }}>
              Powerful Protection <br />
              For Launchpads
            </h1>
          </BrowserView>

          <p data-aos="fade-up">
            Quickly Verify the identity, location and background of project
            owners and team members. Provide your users with tools to monitor
            the status of launched projects, learn about upcoming projects and
            find other Vault Verified projects.
          </p>
          <div className="dream-btn-group">
            <a
              className="btn dream-btn selected"
              href="https://anonydoxx.io/contact"
              data-aos="fade-up"
            >
              Become a Partner
            </a>
            <a
              className="btn dream-btn selected none-border"
              href="#"
              data-aos="fade-up"
            >
              Learn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecWhoWeContant;
