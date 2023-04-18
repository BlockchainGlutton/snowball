import SectionHeading from "../../components/SectionHeading";

const SecPartners = ({ data }) => {
  return (
    <section className="partners">
      <SectionHeading title="Our Awesome Partners" text="" />

      <div className="container">
        <div className="d-flex justify-content-center">
          <p data-aos="fade-up" data-aos-delay="400" className="text-center">
            We are thrilled to be working with these great partners. Contact us
            below to learn how you can join us.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-3 col-sm-6">
            <div className="partner-box">
              <div className="d-flex align-items-center">
                <img
                  src={data && data[0].img}
                  alt=""
                  className="center-block"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="partner-box">
              <div className="d-flex align-items-center">
                <img
                  src={data && data[1].img}
                  alt=""
                  className="center-block"
                  width={230}
                  height={230}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="partner-box">
              <div className="d-flex align-items-center">
                <img
                  src={data && data[2].img}
                  alt=""
                  className="center-block"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="partner-box">
              <div className="d-flex align-items-center">
                <img
                  src={data && data[3].img}
                  alt=""
                  className="center-block"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="partner-box">
              <div className="d-flex align-items-center">
                <img
                  src={data && data[4].img}
                  alt=""
                  className="center-block"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="partner-box">
              <div className="d-flex align-items-center">
                <img
                  src={data && data[5].img}
                  alt=""
                  className="center-block"
                  width={180}
                  height={180}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="partner-box">
              <div className="d-flex align-items-center">
                <img
                  src={data && data[6].img}
                  alt=""
                  className="center-block"
                  width={180}
                  height={180}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="partner-box">
              <div className="d-flex align-items-center">
                <img
                  src={data && data[7].img}
                  alt=""
                  className="center-block"
                  width={800}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecPartners;
