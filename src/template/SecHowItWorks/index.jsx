import { useState } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { makeSubStringForAddr, notify } from '../../utils';

const SecHowItWorks = (props) => {

  const { data, ether, bnb, matic } = props;

  const coins = [ether, bnb, matic];

  const [curTradingViewType, setCurTradingViewType] =
    useState("COINBASE:ETHUSD");
  const [index, setIndex] = useState(0)
  const [isCopied, setIsCopied] = useState(false);

  const showNativeInfo = (_coin) => {
    switch (_coin) {
      case "ether":
        setCurTradingViewType("COINBASE:ETHUSD");
        break;
      case "bnb":
        setCurTradingViewType("BINANCE:BNBUSD");
        break;
      case "matic":
        setCurTradingViewType("COINBASE:MATICUSD");
        break;
    }
  };
  return (
      <section className="features section-padding-100-0">
        {/* <SectionHeading
            title='How it works'
            text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.'
        /> */}
        <div className="container">
          <div className="row">
            <div className="service-img-wrapper how col-lg-6 col-md-12 col-sm-12">
                <TradingViewWidget
                  symbol={curTradingViewType}
                  theme={Themes.DARK}
                  locale="en"
                  width="100%"
                  height={300}
                  interval="5"
                  hide_top_toolbar
                  style="3"
                />
                {/* <img src={imgPhone} className="center-block img-responsive phone-img" alt="" /> */}
            </div>
            <div className="services-column col-lg-6 offset-lg-0 col-md-10 offset-md-1 col-xs-10 offset-xs-1">
              {/*Services Block Four*/}
              {data && data.map((item , key) => (
                <div className={index === key ? "services-block-four how selected" : "services-block-four how"}  
                  key={key} onClick={() => { setIndex(key); showNativeInfo(item.coin)}}>
                  <div className="inner-box">
                    <div className="step">{item.step}</div>
                    <h3><a>{item.title}</a></h3>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between'
                        }}
                      >
                        <div className="text">Total Supply: </div>
                        <div className="text">{coins[key].market_data ? coins[key].market_data.total_supply : "?"}
                        </div>
                      </div>
                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between'
                        }}
                      >
                        <div className="text">24H Low / 24H Hight: </div>
                        <div className="text">
                          <i className="bi bi-arrow-down-left"></i>{" "}
                          {coins[key].market_data
                            ? coins[key].market_data.low_24h.usd
                            : 0.0}{" "}
                        </div>
                      </div>
                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between'
                        }}
                      >
                        <div className="text">Contract Address: </div>
                        <div className="text">
                          {coins[key].contract_address
                            ? makeSubStringForAddr(coins[key].contract_address)
                            : "0x"}{" "}
                          <CopyToClipboard
                            text={coins[key].contract_address}
                            onCopy={() => {
                              setIsCopied(true);
                              notify("info", `Contract address is copied.`);
                            }}
                          >
                            {isCopied ? (
                              <i
                                className="bi bi-clipboard-check"
                                style={{ cursor: "pointer" }}
                              ></i>
                            ) : (
                              <i
                                className="bi bi-clipboard"
                                style={{ cursor: "pointer" }}
                              ></i>
                            )}
                          </CopyToClipboard>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

export default SecHowItWorks;