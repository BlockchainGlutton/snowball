import { MobileView, BrowserView } from "react-device-detect";
import { useMoralis } from "react-moralis";
import EventBus from "../../../hook/EventBus";
import { makeSubStringForAddr } from "../../../utils/index";

function SecWelcomeContent(props) {
  const { setChart, chart } = props;
  const { isAuthenticated, account } = useMoralis();
  const connectWallet = () => {
    EventBus.dispatch("connect-wallet", {});
  };
  return (
    <div className="welcome-content">
      <BrowserView>
        <h1>Biometric Technology for a Decentralized World</h1>
      </BrowserView>
      <MobileView>
        <h1>
          Biometric Technology
          <br /> for a
          <br /> Decentralized World
        </h1>
      </MobileView>
      <p>
        The AnonyDoxx decentralized ecosystem offers next-generation identity
        verification, consumer interaction across four blockchains & access to
        exclusive benefits for $ADXX holders. Track, trade, swap and earn highly
        coveted whitelist access to new Vault Verified projects.
      </p>
      <div className="dream-btn-group">
        <a onClick={connectWallet} className={"btn dream-btn selected"}>
          Launch App
        </a>
        <a href="#" className={"btn dream-btn selected none-border"}>
          Learn More
        </a>
      </div>
      {/* <div className="promo-section py-4">
        <div className="integration-link">
          <span className="integration-icon">
            <img src={props.img} width="24" height="24" alt="" />
          </span>
          <span className="integration-text">
            Current ADXX-USD Price : $ {props.curUSDPrice}{" "}
          </span>
        </div>
      </div> */}
    </div>
  );
}

export default SecWelcomeContent;
