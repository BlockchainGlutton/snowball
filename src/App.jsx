import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useMoralis } from "react-moralis";
import Aos from "aos";

import HomeDemo3 from "./template/";
import BuyCoins from "./template/Purchase";
import MyWallet from "./template/MyWallet";
import Kyc from "./template/Kyc";
import CoinAnalytics from "./template/CoinAnalystics";
import Login from "./template/Login";

import "./App.css";
import "aos/dist/aos.css";
import "./assets/css/General.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/responsive.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isWeb3Enabled, enableWeb3, isWeb3EnableLoading, logout } =
    useMoralis();
  useEffect(() => {
    if (!isWeb3EnableLoading && !isWeb3Enabled) {
      enableWeb3();
    }

    Aos.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Helmet>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>AnonyDoxx | Biometric Build-Chain</title>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0="
          crossorigin="anonymous"
        />
      </Helmet>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<HomeDemo3 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/purchase" element={<BuyCoins />} />
        <Route path="/wallet" element={<MyWallet />} />
        <Route path="/trade" element={<CoinAnalytics />} />
        <Route path="/kyc" element={<Kyc />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;
