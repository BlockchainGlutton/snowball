import { useState } from "react";
import { useMoralis, useERC20Balances, useChain } from "react-moralis";
import { ListGroup, Badge, Spinner, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ERC20Balance(props) {
  const { data: assets, isLoading } = useERC20Balances(props);
  const { Moralis } = useMoralis();
  const { chain } = useChain();
  const [curToken, setCurToken] = useState({});
  const [recipientAddress, setRecipientAddress] = useState("");
  const [coinAmount, setCoinAmount] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const [showTransferModal, setShowTransferModal] = useState(false);
  // handling Wallet connect modal vision.
  const handleClose = () => setShowTransferModal(false);
  const handleShow = () => setShowTransferModal(true);

  // Formatting the balance of ERC20 tokens
  const tokenValue = (value, decimals) => {
    let token = Number(value) / Math.pow(10, Number(decimals));
    return token.toFixed(2);
  };

  const transferAssets = async () => {
    setIsPending(true);
    const options = {
      type: "erc20",
      amount: Moralis.Units.Token(coinAmount, curToken.decimals),
      receiver: recipientAddress,
      contractAddress: curToken.token_address,
      awaitReceipt: false,
    };

    Moralis.transfer(options)
      .then((res) => {
        console.log(res);
        notify("success", "Token transferred successfully!");
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        notify("error", "Error Ocurred in transfer");
        setIsPending(false);
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

  return (
    <>
      <Modal
        show={showTransferModal}
        onHide={handleClose}
        keyboard={false}
        centered
        dialogClassName="transfer-modal"
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-5">
          <div className="d-flex justify-content-center">
            <h4>Total Balance</h4>
          </div>
          <div className="d-flex justify-content-center">
            <h1 className="balance-font-color">
              {curToken
                ? (
                    Number(curToken.balance) /
                    10 ** Number(curToken.decimals)
                  ).toFixed(2)
                : 0}
              &nbsp;{curToken.symbol}
            </h1>
          </div>

          <h6 className="py-2">Recipient Address: </h6>
          <div className="d-flex justify-content-center">
            <input
              type="text"
              className="transfer-input"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>
          <h6 className="py-2">Amount: </h6>
          <div className="d-flex justify-content-center">
            <input
              type="text"
              className="transfer-input"
              value={coinAmount}
              onChange={(e) => setCoinAmount(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center py-2">
            <button
              className="transfer-max-btn"
              onClick={() => {
                let amount = (
                  Number(curToken.balance) /
                  10 ** Number(curToken.decimals)
                ).toFixed(2);
                setCoinAmount(amount);
              }}
            >
              MAX
            </button>
          </div>
          <div className="d-flex justify-content-center py-3">
            <button
              className="apply-btn-blue"
              onClick={() => {
                transferAssets();
              }}
              disabled={isPending}
            >
              {isPending ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" variant="info" size="sm" />
                </div>
              ) : (
                "SEND"
              )}
            </button>
          </div>
        </Modal.Body>

        <Modal.Footer className="px-5">
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      {isLoading && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="success" size="lg" />
        </div>
      )}

      <ListGroup as="ol" numbered>
        {!isLoading &&
          assets &&
          assets.map((token, index) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
              style={{ cursor: "pointer" }}
              key={index}
              action
              onClick={() => {
                setCurToken(token);
                setCoinAmount(0);
                handleShow();
              }}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold text-info">
                  <img
                    src="https://etherscan.io/images/main/empty-token.png"
                    width="28px"
                    height="28px"
                  />
                  &nbsp;{token.symbol}
                </div>
                <a
                  href={`${chain.blockExplorerUrl}address/${token.token_address}/`}
                  target="_blank"
                  className="wallet-address"
                >
                  {token.name}
                </a>
              </div>
              <Badge bg="success" pill>
                {tokenValue(token.balance, token.decimals)}
              </Badge>
            </ListGroup.Item>
          ))}
        {!isLoading && assets && assets.length === 0 && (
          <div className="text-center py-4" style={{ color: "#FFFFFF" }}>
            No Assets found.
          </div>
        )}
      </ListGroup>
    </>
  );
}
export default ERC20Balance;
