const Span = () => <span></span>;

const SecWhoWeContant = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="col-12 col-lg-6">
        <div className="who-we-contant">
          <div className="dream-dots" data-aos="fade-up">
            {Array(7)
              .fill()
              .map((element, key) => (
                <Span key={key} />
              ))}
          </div>
          <h1 data-aos="fade-up" style={{ color: "white" }}>
            ADXX offers micro-economic solutions that stimulate growth.
          </h1>
          <p data-aos="fade-up">
            The $ADXX token is the novel backbone of the AnonyDoxx ecosystem. On
            this dApp you are able to buy it, swap it, gift it, win it and use
            it as a store of value.
          </p>
          <div className="row">
            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
              <div className="token-info-item text-white border-right">
                <h6 className="">Total Supply</h6>
                <h5>100,000,000,000</h5>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
              <div className="token-info-item text-white">
                <h6 className="">Taxes</h6>
                <h5>6 Percent</h5>
              </div>
            </div>
          </div>
          <div className="dream-btn-group pt-3">
            <a
              className="btn dream-btn selected"
              href="https://pancakeswap.finance/swap"
              data-aos="fade-up"
              target="_blank"
            >
              Buy ADXX
            </a>
            <a
              className="btn dream-btn selected none-border"
              href="#"
              data-aos="fade-up"
            >
              Connect to learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecWhoWeContant;
