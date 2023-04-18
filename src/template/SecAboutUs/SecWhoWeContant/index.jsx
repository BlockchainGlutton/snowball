import EventBus from "../../../hook/EventBus";
const Span = () => <span></span>;

const SecWhoWeContant = () => {
  const connectWallet = () => {
    EventBus.dispatch("connect-wallet", {});
  };
  return (
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
          Verify your project.
          <br />
          Gain access to the AnonyDoxx ecosystem.
        </h1>
        <p data-aos="fade-up">
          The DeFi community wants more protection. The Vault Verification
          process provides verification beyond the standard KYC processes, using
          enhanced biometrics and AI. Verify yourself as well as your whole
          project team, without Public Doxing. Start the Verification process
          instantly, just by connecting your wallet below.
        </p>
        <div className="dream-btn-group">
          <a
            className="btn dream-btn selected "
            onClick={connectWallet}
            data-aos="fade-up"
          >
            Get Verified
          </a>
          <a
            href="#"
            data-aos="fade-up"
            className="btn dream-btn selected none-border"
          >
            Learn
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecWhoWeContant;
