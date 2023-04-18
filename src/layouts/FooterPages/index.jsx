import { useEffect, useState } from "react";
import { getTokenBNBPrice } from "../../apis/tokenApi";

import Logo from "../../assets/img/logo.svg";
import LogoIcon from "../../assets/img/logo.png";
import "./footer.css";
import SecContent from "./SecContent";

const Footer = () => {
  const [curUSDPrice, setCurUSDPrice] = useState(0);
  const fetchPriceData = async () => {
    let priceData = await getTokenBNBPrice();
    setCurUSDPrice(Number(priceData.data.price).toFixed(9));
  };

  useEffect(() => {
    fetchPriceData();
  }, []);

  return (
    <footer className="footer-area bg-img">
      <div
        className="footer-content-area "
        style={{ backgroundColor: "#27262C" }}
      >
        <div className="container">
          <div className="row">
            <div
              className="col-12 pb-3"
              style={{ borderBottom: "1px solid grey" }}
            >
              <div className="d-flex justify-content-start">
                <img src={Logo} />
              </div>
            </div>

            <div className="col-6 pt-3">
              <div className="d-flex justify-content-start align-items-center text-white">
                <img src={LogoIcon} width={30} />
                &nbsp;
                <span style={{ color: "#B3A8CC" }}>${curUSDPrice}</span>
              </div>
            </div>
            <div className="col-6 pt-3">
              <div className="d-flex justify-content-end align-items-center">
                <a
                  className="close-btn"
                  href="https://pancakeswap.finance/swap"
                  target="_blank"
                >
                  Buy ADXX
                </a>
              </div>
            </div>
            <div className="col-12">
              <SecContent />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
