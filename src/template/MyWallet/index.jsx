// Import Modules
import React, { useEffect, useState } from "react";
import { useMoralis, useChain } from "react-moralis";
import { Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { isBrowser, isMobile } from "react-device-detect";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../layouts/Header";
import Footer from "../../layouts/FooterPages";

// Import Hook Components
import EventBus from "../../hook/EventBus";

// Import Components
import NativeBalance from "../../components/NativeBalance";
import ERC20Balance from "../../components/ERC20Balances";
import NFTBalances from "../../components/NFTBalances";
import ERC20Transfer from "../../components/ERC20Transfer";

// Import assets
import WalletList from "../../components/WalletList";
import walletImg from "../../assets/img/mywallet.png";

function Wallet() {
  const {
    authenticate,
    isAuthenticated,
    isWeb3Enabled,
    enableWeb3,
    user,
    isWeb3EnableLoading,
    chainId,
    logout,
    account,
    Moralis,
  } = useMoralis();
  const { chain } = useChain();
  const navigate = useNavigate();
  const [curUser, setCurUser] = useState("");

  // if (ERC20Transfers) {
  //   console.log(ERC20Transfers);
  // }

  useEffect(() => {
    if (account) {
      setCurUser(account);
    }
  }, [account, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && !account) {
      navigate("/");
    }
  }, []);

  // State Variables
  const [isCopied, setIsCopied] = useState(false);
  const [balanceOfNative, setBalanceOfNative] = useState({});

  // make wallet address format
  const makeSubStringForAddr = (_str) => {
    if (_str.length > 0) {
      const str_address =
        _str.substring(0, 6) +
        "..." +
        _str.substring(_str.length - 7, _str.length);
      return str_address;
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

  // Handle Switch Wallet Modal
  const switchWallet = () => {
    EventBus.dispatch("connect-wallet", {});
  };
  return (
    <>
    <Header />
      <WalletList />
      {curUser.length > 0 && (
        <>
          <div className="py-5">
            <div className="container">
              <div className="wallet-img d-flex justify-content-center">
                <img src={walletImg} width="300" />
              </div>
              <div className="text-center success-font py-4">
                <h3>
                  <a
                    href={`${chain.blockExplorerUrl}address/${account}/`}
                    target="_blank"
                    className="wallet-address"
                  >
                    {account ? makeSubStringForAddr(account) : "My wallet"}
                  </a>
                  &nbsp;
                  <CopyToClipboard
                    text={account}
                    onCopy={() => {
                      setIsCopied(true);
                      notify("info", `Your account address is copied.`);
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
                </h3>
                <NativeBalance props={{ chain: chainId }} />
                <p>
                  <button className="switch-network-btn" onClick={switchWallet}>
                    Switch Network
                  </button>
                </p>
              </div>
              <div className="d-flex justify-content-center">
                {isBrowser && (
                  <div className="col-6">
                    <Tabs
                      defaultActiveKey="assets"
                      id="uncontrolled-tab-example"
                      className=""
                    >
                      <Tab eventKey="assets" title="Assets">
                        <ERC20Balance props={{ chain: chainId }} />
                      </Tab>
                      <Tab eventKey="nft" title="NFTs">
                        <NFTBalances props={{ chain: chainId }} />
                      </Tab>
                      <Tab eventKey="activity" title="Activity">
                        <ERC20Transfer />
                      </Tab>
                    </Tabs>
                  </div>
                )}
                {isMobile && (
                  <div className="col-12">
                    <Tabs
                      defaultActiveKey="assets"
                      id="uncontrolled-tab-example"
                      className=""
                    >
                      <Tab eventKey="assets" title="Assets">
                        <ERC20Balance props={{ chain: chainId }} />
                      </Tab>
                      <Tab eventKey="nft" title="NFTs">
                        <NFTBalances props={{ chain: chainId }} />
                      </Tab>
                      <Tab eventKey="activity" title="Activity">
                        <ERC20Transfer />
                      </Tab>
                    </Tabs>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />

    </>
  );
}

export default Wallet;
