import React, { useState, useEffect } from "react";
import { useMoralis, useNativeBalance } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "react-bootstrap";
import SwapLogo from "../../assets/img/swap-coin.png";
import { Spinner } from "react-bootstrap";
import { getBalanceOfADXX } from "../../apis/tokenApi";
import Metamask from "../../assets/img/walletIcons/metamaskWallet.png";

// Import assets
import WalletList from "../../components/WalletList";
import Header from "../../layouts/Header";
import Footer from "../../layouts/FooterPages";

// Import Hook Components
import EventBus from "../../hook/EventBus";

function BuyCoins() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 992px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min-width: 992px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);

  const { isAuthenticated, account, Moralis } = useMoralis();
  const {
    data: balance,
    isLoading,
    getBalances,
  } = useNativeBalance({ chain: "bsc" });
  const navigate = useNavigate();
  const [amountOfBNB, setAmountOfBNB] = useState(0);
  const [bnbBalance, setBnbBalance] = useState("0");
  const [swapedBalance, setSwapedBalance] = useState(0);
  const [adxxBalance, setAdxxBalance] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !account) {
      navigate("/");
    }
    getNativeBalance();
    getADXXBalance();
  }, []);

  useEffect(() => {
    async function init() {
      await Moralis.initPlugins();
    }
    init();
  }, []);

  useEffect(() => {
    if (!Moralis?.["Plugins"]?.["oneInch"]) return null;
  }, [Moralis, Moralis.Plugins]);

  const getNativeBalance = async () => {
    let native = await getBalances();
    let balance = (Number(native.balance) / 1e18).toFixed(9);
    setAmountOfBNB(balance * 0.75);
  };

  const getADXXBalance = async () => {
    let ADXX = await getBalanceOfADXX(account);
    if (ADXX) {
      let balanceOfADXX = Number(ADXX.balance) / 10 ** Number(ADXX.decimals);
      setAdxxBalance(balanceOfADXX.toFixed(2));
    }
  };

  const addADXX = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Initially only supports ERC20, but eventually more!
            options: {
              address: "0x1de305515a132db0ed46e9fa2ad2804f066e43e3", // The address that the token is at.
              symbol: "ADXX", // A ticker symbol or shorthand, up to 5 chars.
              decimals: 9, // The number of decimals in the token
              image: "https://etherscan.io/images/main/empty-token.png", // A string url of the token logo
            },
          },
        });

        if (wasAdded) {
          notify("success", "ADXX has already added!");
        } else {
          notify("success", "ADXX is added successfully!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      notify("error", "This function runs only in the Web Browser");
    }
  };

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

  async function getQuote(_amount) {
    let amount = Moralis.Units.ETH(_amount);
    const quote = await Moralis.Plugins.oneInch.quote({
      chain: "bsc", // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // The token you want to swap
      toTokenAddress: "0x1de305515a132db0ed46e9fa2ad2804f066e43e3", // The token you want to receive
      amount: amount,
    });
    console.log(quote);
    let expectedAmount =
      Number(quote.toTokenAmount) / 10 ** quote.toToken.decimals;
    console.log(Math.floor(expectedAmount));
    setSwapedBalance(Math.floor(expectedAmount));
  }

  async function swap(_amount) {
    if (Number(bnbBalance) > Number(amountOfBNB)) {
      notify("error", "Insuifficient Funds ERROR!");
      return;
    }
    let amount = Moralis.Units.ETH(_amount);
    console.log(amount);
    setIsSwapping(true);
    await Moralis.Plugins.oneInch
      .swap({
        chain: "bsc", // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // The token you want to swap
        toTokenAddress: "0x1de305515a132db0ed46e9fa2ad2804f066e43e3", // The token you want to receive
        amount: amount,
        fromAddress: account, // Your wallet address
        slippage: 10,
      })
      .then((res) => {
        console.log(res);
        getNativeBalance();
        getADXXBalance();
        setBnbBalance("0");
        setSwapedBalance(0);
        notify("success", "Succesfully Received ADXX!");
        setIsSwapping(false);
      })
      .catch((err) => {
        console.log(err.message);
        notify("error", err.message);
        setIsSwapping(false);
      });
  }

  return (
    <>
        <Header />
      <WalletList />
      {isAuthenticated && account && (
        <div className="py-5">
          <div className="container">
            <div className="purchase-coin-img d-flex justify-content-center">
                <Card className="swap-card" 
                    style={{ 
                        display: 'flex', 
                        flexDirection: matches ? 'row' : "column",
                        backgroundColor: 'transparent',
                        border: 0,
                        boxShadow: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        gap: 30
                    }}
                >
                  <div className="d-flex justify-content-center" style={{ flex: 1 }}>
                    <Card.Img
                      variant="top"
                      src={SwapLogo}
                      className="swap-img"
                    />
                  </div>

                  <Card.Body style={{ flex: 1 }}>
                    <Card.Title className="text-center success-font">
                      Purchase ADXX
                    </Card.Title>
                    <div className="py-3">
                      {isLoading && (
                        <div className="d-flex justify-content-center mt-5">
                          <Spinner
                            animation="border"
                            variant="info"
                            size="lg"
                          />
                        </div>
                      )}
                      {!isLoading && (
                        <>
                          <div className="row py-2">
                            <div className="col-4 align-items-center text-white">
                              <img
                                src="https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1.png"
                                style={{ width: "35px" }}
                              />
                              &nbsp; BNB
                            </div>
                            <div className="col-8 d-flex align-items-center text-white">
                              Available Balance: {amountOfBNB}
                            </div>
                          </div>
                          <input
                            value={bnbBalance}
                            onChange={(e) => {
                              let amount = e.target.value;
                              setBnbBalance(amount);
                              if (Number(amount) > 0) {
                                getQuote(Number(amount));
                              }
                            }}
                            className="swap-input"
                          />
                          {bnbBalance < 0.01 && (
                            <div className="text-center warn-text">
                              Minimum Value must be greater than 0.01 BNB
                            </div>
                          )}

                          <div className="d-flex justify-content-center py-3">
                            <button className="swap-exchange">
                              <i className="bi bi-arrow-down"></i>
                            </button>
                          </div>
                          <div className="row py-2">
                            <div className="col-6 align-items-center text-white">
                              <img
                                src="https://etherscan.io/images/main/empty-token.png"
                                style={{ width: "35px" }}
                              />
                              &nbsp; ADXX
                              <button className="add-adxx" onClick={addADXX}>
                                <img src={Metamask} width="25" />
                              </button>
                            </div>
                            <div className="col-6 d-flex align-items-center text-white">
                              Balance: {adxxBalance}
                            </div>
                          </div>
                          <input
                            value={swapedBalance}
                            className="swap-input"
                            readOnly
                          />
                        </>
                      )}
                    </div>
                    <h6 className="text-white">
                      Transaction Fee: 1% on each swap
                    </h6>
                    <div className="d-flex justify-content-center">
                      <button
                        className="swap-btn"
                        onClick={() => swap(Number(bnbBalance))}
                        disabled={isSwapping || bnbBalance < 0.01}
                      >
                        {isSwapping ? (
                          <Spinner
                            animation="border"
                            variant="info"
                            size="sm"
                          />
                        ) : (
                          "PURCHASE"
                        )}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default BuyCoins;
