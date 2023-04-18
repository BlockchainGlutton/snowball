import SectionHeading from "../../components/SectionHeading";
import EventBus from "../../hook/EventBus";

const SecPartners = ({ data, onApply, isAuthenticated, account }) => {
  const connectWallet = () => {
    EventBus.dispatch("connect-wallet", {});
  };
  const makeSubStringForAddr = (_str) => {
    if (_str.length > 0) {
      const str_address =
        _str.substring(0, 5) +
        "..." +
        _str.substring(_str.length - 4, _str.length);
      return str_address;
    }
  };
  return (
    <section className="partners py-5 back-dark">
      <div className="section-heading text-center text-white">
        {/* <div className="dream-dots justify-content-center" data-aos="fade-up" data-aos-delay='200'>
            {Array(7).fill().map((item , key) => (
                    <Span key={key} />
                ))}
        </div> */}
        <h2
          data-aos="fade-up"
          style={{ color: "#FFFFFF" }}
          data-aos-delay="300"
        >
          Immediate Access
        </h2>
        <p data-aos="fade-up" data-aos-delay="400" style={{ color: "white" }}>
          The Vault is live and audited. Connect your crypto wallet and have
          immediate access to the basic features in the app.
        </p>
        <div className="d-flex justify-content-center pt-5">
          {" "}
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            style={{ fontWeight: "bold", color: "white" }}
          >
            It’s easy, no registration required.
          </p>
        </div>

        <div className="py-3">
          <a href="#" data-aos="fade-up" data-aos-delay="400">
            Learn how to start
          </a>
        </div>
        <div className="py-3">
          <a
            className="btn dream-btn selected"
            data-aos="fade-up"
            data-aos-delay="500"
            onClick={connectWallet}
          >
            {account && isAuthenticated ? "Connected" : "Connect Wallet"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default SecPartners;
