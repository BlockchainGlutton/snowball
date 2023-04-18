import SectionHeading from "../../components/SectionHeading";
import SecSingleCoolFact from "./SecSingleCoolFact";
import LogoGif from "../../assets/img/logo.gif";
import Analyzation from "../../assets/img/services/3.svg";
import Recognition from "../../assets/img/services/5.svg";
import Liveness from "../../assets/img/services/liveness.png";

const SecTrustIntro = ({ data }) => {
  return (
    <section className="trust-section py-3">
      <div className="section-heading text-center">
        <h1
          data-aos="fade-up"
          data-aos-delay="300"
          style={{ color: "#FFFFFF" }}
        >
          A DeFi Ecosystem.
          <br />
          Built to Help You Scale.
        </h1>
        <div className="d-flex justify-content-center py-3">
          <img
            src={LogoGif}
            data-aos="fade-up"
            data-aos-delay="300"
            width={120}
          />
        </div>
        <p
          data-aos="fade-up"
          data-aos-delay="500"
          className="py-3"
          style={{ color: "#FFFFFF" }}
        >
          The ADXX ecosystem gives you access to breakthrough tools to manage
          your business. Vault Verifications increase your security. Our wallet
          enables holders to explore other Verified projects and view all their
          holdings in one place. Our Verified community connects you with
          projects as well as the talent to build your team.
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="500"
          style={{ color: "#FFFFFF", fontWeight: "bold" }}
        >
          Your journey starts here.
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-4 col-md-4 col-lg-4" data-aos="fade-up">
            <div className="service_single_content text-left mb-100">
              <div className="service_icon">
                <div className="row">
                  <div className="col-7">
                    <h6>
                      <span className="service-font">80</span> <br />
                      Analyzation Points
                    </h6>
                    <p></p>
                  </div>
                  <div className="col-5">
                    <div className="d-flex justify-content-end">
                      <img src={Analyzation} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-4" data-aos="fade-up">
            <div className="service_single_content text-left mb-100">
              <div className="service_icon">
                <div className="row">
                  <div className="col-7">
                    <h6>
                      <span className="service-font">99.97%</span>
                      <br /> Recognition Accuracy
                    </h6>
                    <p></p>
                  </div>
                  <div className="col-5">
                    <div className="d-flex justify-content-end">
                      <img src={Recognition} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-4" data-aos="fade-up">
            <div className="service_single_content text-left mb-100">
              <div className="service_icon">
                <div className="row">
                  <div className="col-7">
                    <h6>
                      <span className="service-font">100% </span>
                      <br />
                      Liveness Detection
                    </h6>
                    <p></p>
                  </div>
                  <div className="col-5">
                    <div className="d-flex justify-content-end">
                      <img src={Liveness} alt="" width={56} />
                    </div>
                  </div>
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
