import { useState, useEffect } from "react";
import "./style/HomeDemo3.scss";

import {
  VerticalSocial,
  // HowItWorksInfo,
  SingleCoolFact,
  service_single_content,
  timelineInfo,
  ServiceBlock,
  SocialListIco,
  FQAInfo,
  DocElementTitle,
  TokenText,
  TeamMember,
  PartnersData,
} from "../data/data-containers/data-HomeDemo3.js";

import {
  HomeDemo3About1,
  HomeDemo3Solution,
  HomeDemo3VideoBg4,
  HomeDemo3ImgPhone,
  HomeDemo3RingsBg,
  HomeDemo3Allocation,
  HomeDemo3BgRoadmap,
} from "../utils/allImgs";

import VerifiedProject from "../assets/img/services/verified.png";
import { PolygonLogo, BSCLogo, ETHLogo } from "../assets/js/walletLogos";
import None from "../assets/img/bg-img/bg-4.jpg";
import Logo from "../assets/img/logo.png";

import { handelTitle, notify } from "../utils";
import Header from "../layouts/Header";
import Footer from "../layouts/FooterPages";
import WalletList from "../components/WalletList";

import SecWelcomeArea from "./SecWelcomeArea";
import SecVerticalSocial from "./SecVerticalSocial";
import SecHowItWorks from "./SecHowItWorks";
import SecTrust from "./SecTrust";
import SecTrustIntro from "./SecTrustIntro";

import SecAboutUsClient from "./SecAboutUsClient";
import SecAboutUs from "./SecAboutUs";
import SecAboutUsEnd from "./SecAboutUsEnd";
import SecAboutUsReverse from "./SecAboutUsReverse";
import SecTrustPrize from "./SecTrustPrize";
import SecDemoVideo from "./SecDemoVideo";
import SecOurServices from "./SecOurServices";
import SecOurRoadmap from "./SecOurRoadmap";
import SecOurFeatures from "./SecOurFeatures";
import SecSubscribe from "./SecSubscribe";
import SecFAQ_Timeline from "./SecFAQ_Timeline";
import SecDistribution from "./SecDistribution";
import SecTeam from "./SecTeam";
import SecContact from "../layouts/FooterPages/SecContact";
import SecPartners from "./SecPartners";
import SecPartnersFooter from "./SecPartnersFooter";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import eventBus from "../hook/EventBus";
import {
  getTokenBNBPrice,
  getBalanceOfADXX,
  getNativeCoinInfo,
  getTokenPriceHistory,
} from "../apis/tokenApi";
import { convertUnixToNormal } from "../hook/Date";

export const HowItWorksInfo = [
  { step: <ETHLogo />, title: "WETH Price Statistics", coin: "ether" },
  { step: <BSCLogo />, title: "Wrapped BNB Price Statistics", coin: "bnb" },
  {
    step: <PolygonLogo />,
    title: "Wrapped Matic Price Statistics",
    coin: "matic",
  },
];

let HomeDemo3 = () => {
  //--------------------------------------------
  const { isAuthenticated, account } = useMoralis();
  const navigate = useNavigate();
  const [minADXX, setMinADXX] = useState(0);
  const [curBalance, setCurBalance] = useState(0);
  const [curUSDPrice, setCurUSDPrice] = useState(0);
  const [curMode, setCurMode] = useState("dark");
  const [tradeData, setTradeData] = useState([]);
  const [pvData, setPvData] = useState([]);

  const [ether, setEther] = useState({});
  const [bnb, setBnb] = useState({});
  const [matic, setMatic] = useState({});

  // Displaying State
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Fetching some native coins price
  const fetchPrice = async () => {
    setIsLoading(true);
    let trading = await getTokenPriceHistory(1);
    makeChartData(trading.history);
    let priceData = await getTokenBNBPrice();
    let wBNB = await getNativeCoinInfo("wbnb");
    let wEther = await getNativeCoinInfo("weth");
    let wMatic = await getNativeCoinInfo("wmatic");
    setTradeData(trading);
    setBnb(wBNB);
    setEther(wEther);
    setMatic(wMatic);
    setCurUSDPrice(Number(priceData.data.price).toFixed(9));
    let oneAdxx = Number(priceData.data.price_BNB);
    let oneBNB = Math.ceil(1 / oneAdxx);
    setMinADXX(oneBNB);
    setIsLoading(false);
  };

  const updatePriceHistory = async (e, _duration) => {
    setIsLoading(true);
    document.querySelector(".duration-btn-group .active") &&
      document
        .querySelector(".duration-btn-group .active")
        .classList.remove("active");
    e.currentTarget.classList.add("active");
    let trading = await getTokenPriceHistory(_duration);
    makeChartData(trading.history);
    setTradeData(trading);
    setIsLoading(false);
  };

  const makeChartData = (_array) => {
    let chartData = [];
    if (!_array) return;
    _array.forEach((value, index) => {
      let data = {
        date: convertUnixToNormal(value.date),
        rate: value.rate,
        volume: value.volume,
        USDVolume: value.rate * value.volume,
      };
      chartData.push(data);
    });

    setPvData(chartData);
  };

  const gradientOffset = () => {
    if (pvData && pvData.length > 0) {
      const dataMax = Math.max(...pvData.map((i) => i.volume));
      const dataMin = Math.min(...pvData.map((i) => i.volume));

      if (dataMax <= 0) {
        return 0;
      }
      if (dataMin >= 0) {
        return 1;
      }

      return dataMax / (dataMax - dataMin);
    }
  };

  const off = gradientOffset();

  useEffect(() => {
    fetchPrice();
  }, []);

  useEffect(() => {
    if (account) {
      getADXXBalance();
    }
  }, [account]);

  useEffect(() => {
    eventBus.on("mode", (e) => {
      setCurMode(e.value);
    });
  });

  // Applying Now function
  const applyNow = () => {
    if (curBalance < 1) {
      notify(
        "error",
        `You should have at least ${minADXX} ADXX Coins for verification.`
      );
      fetchPrice();
      return;
    }

    navigate("/kyc");
  };

  const getADXXBalance = async () => {
    let ADXX = await getBalanceOfADXX(account);
    if (ADXX) {
      let balanceOfADXX = Number(ADXX.balance) / 10 ** Number(ADXX.decimals);
      setCurBalance(balanceOfADXX.toFixed(2));
    }
  };
  //--------------------------------------------

  useEffect(() => {
    handelTitle("Home Template3");
  }, []);

  useEffect(() => {
    if (document.title === "Home Template3") {
      document.getElementsByTagName("body")[0].style.backgroundImage =
        "linear-gradient(180deg,#240044 0,#0f0240 25%,#400959 40%,#0f0240 65%,#0f0240)";
    } else {
      document.getElementsByTagName("body")[0].style.backgroundImage =
        "linear-gradient(to right, #4834d4, #341f97)";
    }
  }, []);

  return (
    <>
      <Header />
      <div className="HomeDemo3">
        <WalletList />
        <SecWelcomeArea
          tradeData={tradeData}
          curUSDPrice={curUSDPrice}
          pvData={pvData}
          updatePriceHistory={updatePriceHistory}
        />

        <SecVerticalSocial data={VerticalSocial} />
        <SecTrustIntro data={SingleCoolFact} />
        <SecAboutUs img={VerifiedProject} />
        <SecAboutUsReverse img={None} />
        <SecTrustPrize data={SingleCoolFact} />
        {/* <SecDistribution img={HomeDemo3Allocation} data={TokenText} /> */}
        <SecAboutUsEnd img={Logo} />
        {/* <SecHowItWorks
          data={HowItWorksInfo}
          ether={ether}
          bnb={bnb}
          matic={matic}
        /> */}

        {/* <SecTrust data={SingleCoolFact} /> */}

        {/* <SecAboutUsClient img={HomeDemo3About1} /> */}

        {/*<SecDemoVideo img={HomeDemo3VideoBg4} /> */}
        <div className="clearfix" />
        {/* <SecOurServices data={service_single_content} />
        <SecOurRoadmap data={timelineInfo} img={HomeDemo3BgRoadmap} />
        <SecOurFeatures data={ServiceBlock} imgPhone={HomeDemo3ImgPhone} Rings={HomeDemo3RingsBg} /> */}
        {/* <SecSubscribe data={SocialListIco} />
        <SecFAQ_Timeline FQAInfo={FQAInfo} DocElementTitle={DocElementTitle} />
        
        <SecTeam data={TeamMember} /> */}
        <SecPartnersFooter data={PartnersData} />
        <SecPartners
          data={PartnersData}
          onApply={applyNow}
          isAuthenticated={isAuthenticated}
          account={account}
        />
      </div>
      <SecContact />
      <Footer />
    </>
  );
};

export default HomeDemo3;
