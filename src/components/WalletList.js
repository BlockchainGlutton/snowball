// import npm modules
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap";
import { useChain, useMoralis } from "react-moralis";
import { isBrowser, isMobile } from "react-device-detect";
import Web3 from "web3";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import hook, helper functions, and constants.
import EventBus from "../hook/EventBus";
import { connectors, networks } from "../constants";
import { coinAddress } from "../contract/address";
import ABI from "../contract/adxx.json";

var coinContract, web3Js;

function WalletList() {
  const {
    authenticate,
    isAuthenticated,
    isWeb3Enabled,
    enableWeb3,
    user,
    isWeb3EnableLoading,
    logout,
    account,
    Moralis,
  } = useMoralis();

  useEffect(() => {
    // Catching the Wallet connect modal calling event in real time.
    EventBus.on("connect-wallet", () => {
      handleShow();
    });
  }, []);

  useEffect(() => {
    const loadContract = async () => {
      web3Js = await new Web3(Moralis.provider);
      coinContract = await new web3Js.eth.Contract(ABI, coinAddress);
      console.log("coinContract is loaded", coinContract);
    };
    if (isWeb3Enabled && isAuthenticated) {
      loadContract();
    }
  }, [isWeb3Enabled]);

  const { chainId, switchNetwork } = useChain();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // Initialize Variables from constants.
  const [connector, setConnector] = useState(connectors);
  const [network, setNetwork] = useState(networks);

  // Custom State Variables
  const [curUser, setCurUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // handling Wallet connect modal vision.
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Set the current Wallet.
  const handleStatusOfWallet = (_title) => {
    document.querySelector(".connect-wallet .active") &&
      document
        .querySelector(".connect-wallet .active")
        .classList.remove("active");
    connector.forEach((value) => {
      if (value.active) {
        value.active = false;
      }
    });
    connector.forEach((value) => {
      if (value.title === _title) {
        value.active = true;
      }
    });
  };

  // Set the current Chain.
  const handleStatusOfChain = (_title) => {
    document.querySelector(".switch-network .active") &&
      document
        .querySelector(".switch-network .active")
        .classList.remove("active");
    network.forEach((net) => {
      if (net.active) {
        net.active = false;
      }
    });
    network.forEach((net) => {
      if (net.value === _title) {
        net.active = true;
      }
    });
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

  // Connect wallet function with connectorId and the title of wallet.
  const connectWallet = async (_connectorId, _title) => {
    if (isBrowser) {
      if (typeof window.ethereum === "undefined") {
        notify("error", "Please install metamask extension first");
        return;
      }
    }
    setIsLoading(true);

    await authenticate({
      provider: _connectorId,
      signingMessage: "Welcome to the Vault!",
      onComplete: () => {
        setCurUser(account);
        handleStatusOfWallet(_title);
        setIsLoading(false);
      },
    });
    if (chainId !== "0x38") {
      await switchNetwork("0x38");
    }
  };

  // Select Network with chainId and the title of network.
  const selectNetwork = async (_chainId, _title) => {
    // if the wallet is not connected to the app,
    if (!chainId) {
      notify("error", "Please connect your wallet first!");
      return;
    }

    // if the chain had already selected,
    if (chainId === _chainId) {
      notify("info", "You are currently connected this chain.");
    }

    setIsLoading(true);
    await switchNetwork(_chainId);
    handleStatusOfChain(_title);
    setIsLoading(false);
  };

  // Go to Wallet page to see the balances of Native and custom tokens
  const goToWallet = () => {
    handleClose();
    navigate("/wallet");
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        centered
        dialogClassName="connect-wallet-modal"
      >
        <Modal.Header>
          <Modal.Title>Connect Wallet</Modal.Title>
          <button className="modal-close" onClick={handleClose}>
            x
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            {/* <h6>Select Network</h6>
            <div className="row switch-network d-flex justify-content-center">
              {network.map((value, index) => (
                <div className="col-6 py-2" key={index}>
                  <button
                    disabled={isLoading}
                    className={
                      value.active ? "network-btn active" : "network-btn"
                    }
                    onClick={() => selectNetwork(value.key, value.value)}
                  >
                    {value.icon}&nbsp;&nbsp;
                    {value.value}
                  </button>
                </div>
              ))}
            </div> */}

            <div className="row connect-wallet d-flex justify-content-center mt-3">
              {connector.map((value, index) => (
                <div className="col-6 py-2" key={index}>
                  <button
                    className={
                      value.active ? "wallet-btn active" : "wallet-btn"
                    }
                    onClick={() =>
                      connectWallet(value.connectorId, value.title)
                    }
                    disabled={isLoading}
                  >
                    <img src={value.icon} width="30" />
                    &nbsp;&nbsp;
                    {value.title}
                  </button>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center py-3">
              <h6 style={{ color: "purple" }}>
                Haven't got a crypto Wallet yet?
              </h6>
            </div>
            <div className="d-flex justify-content-center pb-3">
              <a className="btn dream-btn" style={{ border: "none" }}>
                Learn How to Connect
              </a>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {isAuthenticated && account && (
            <button className="buy-adxx" onClick={() => navigate("/purchase")}>
              Buy ADXX
            </button>
          )}
          {isAuthenticated && account && (
            <button className="close-btn" onClick={goToWallet}>
              My Wallet
            </button>
          )}

          {isAuthenticated && account && (
            <button
              className="close-btn"
              onClick={() => {
                logout();
                setCurUser("");
                handleClose();
                navigate("/");
              }}
              disabled={isLoading}
            >
              Logout
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WalletList;
