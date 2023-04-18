import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import { TechnicalAnalysis } from "react-tradingview-embed";
import { isBrowser, isMobile } from "react-device-detect";

// Import assets
import WalletList from "../../components/WalletList";
import AnalyticsLogo from "../../assets/img/analytics.png";

// Import Hook Components
import EventBus from "../../hook/EventBus";

function CoinAnalytics() {
  const navigate = useNavigate();
  // Notification using React-toastify.
  const notify = (_type, _text) =>
    toast(_text, {
      position: "top-right",
      type: _type,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  return (
    <>
      <WalletList />
      <div className="py-3">
        <div className="container">
          <div className="d-flex justify-content-center">
            <img src={AnalyticsLogo} width={300} />
          </div>
          <div className="d-flex justify-content-center">
            <h4 className="success-font">Trading View</h4>
          </div>
        </div>
        {isBrowser && (
          <div className="container row px-4 py-2 d-flex justify-content-center">
            <div className="col-lg-8 col-md-8 col-sm-12">
              <TradingViewWidget
                symbol="BNBUSDT"
                theme={Themes.LIGHT}
                locale="en"
                autosize
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <TechnicalAnalysis
                widgetProps={{
                  colorTheme: "light",
                  symbol: "BNBUSDT",
                  width: "100%",
                  interval: "1m",
                  locale: "en",
                  showIntervalTabs: true,
                }}
              />
            </div>
          </div>
        )}
        {isMobile && (
          <div className="d-flex justify-content-center container row px-2">
            <div className="col-12">
              <TradingViewWidget
                symbol="BNBUSDT"
                theme={Themes.LIGHT}
                locale="en"
                autosize
              />
            </div>
            <div className="col-12">
              <TechnicalAnalysis
                widgetProps={{
                  colorTheme: "light",
                  symbol: "BNBUSDT",
                  width: "100%",
                  interval: "1m",
                  locale: "en",
                  showIntervalTabs: true,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CoinAnalytics;
