import SectionHeading from "../../components/SectionHeading";
import SecSingleCoolFact from "./SecSingleCoolFact";
import Logo from "../../assets/img/logo.png";
import Analyzation from "../../assets/img/services/3.svg";
import Recognition from "../../assets/img/services/5.svg";
import Liveness from "../../assets/img/services/liveness.png";
import EventBus from "../../hook/EventBus";

const SecTrustIntro = ({ data }) => {
  const connectWallet = () => {
    EventBus.dispatch("connect-wallet", {});
  };
  return (
    <section className="trust-section pt-4 back-dark">
      <div className="section-heading text-center">
        <h1
          data-aos="fade-up"
          data-aos-delay="300"
          style={{ color: "#FFFFFF" }}
        >
          Exclusive Holder Benefits
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="500"
          className="py-3"
          style={{ color: "#FFFFFF" }}
        >
          Review and research verified projects before they launch. Apply for
          Whitelist Spots, potentially securing your ability to purchase prior
          to public launch.
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div
            className="col-12 col-sm-12 col-md-12 col-lg-12"
            data-aos="fade-up"
          >
            <div className="d-flex justify-content-center">
              <div
                className="trust-item"
                style={{
                  width: "325px",
                  height: "350px",
                  borderRadius: "35px",
                  backgroundColor: "#FFD75B",
                }}
              >
                <div className="d-flex justify-content-start">
                  <h5 style={{ color: "#280D5F", fontWeight: "bold" }}>
                    Early access
                  </h5>
                </div>
                <div className="d-flex justify-content-start">
                  <h3 style={{ color: "#280D5F", fontWeight: "bold" }}>
                    Guaranteed Buying Rights
                  </h3>
                </div>
                <div className="py-3">
                  {" "}
                  <h6 style={{ color: "#280D5F" }}>
                    Learn about projects before they even start advertising
                  </h6>
                </div>
                <div className="d-flex justify-content-center py-3">
                  <a
                    className="btn dream-btn"
                    style={{ border: "none", width: "100%" }}
                    onClick={connectWallet}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecTrustIntro;
