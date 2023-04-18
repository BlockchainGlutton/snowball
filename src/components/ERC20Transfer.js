import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Table, Spinner } from "react-bootstrap";
import { getTokenInfo } from "../apis/tokenApi";

const MAX = 20;

function ERC20Transfer() {
  const { account } = useMoralisWeb3Api();
  const { isInitialized, account: walletAddress, chainId } = useMoralis();
  const [ERC20Transfers, setERC20Transfers] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isInitialized)
      fetchERC20Transfers().then((result) => {
        makeDataForTable(result);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, chainId, walletAddress]);

  const fetchERC20Transfers = async () => {
    return await account
      .getTokenTransfers({ address: walletAddress, chain: chainId })
      .then((result) => result.result);
  };

  const tokenValue = (value, decimals) => {
    let token = Number(value) / Math.pow(10, Number(decimals));
    return token.toFixed(2);
  };

  const makeDataForTable = async (_array) => {
    let datas = [];
    setIsLoading(true);
    if (MAX <= _array.length) {
      for (let i = 0; i < MAX; i++) {
        let txLog = {};
        let tokenSymbol = await getTokenInfo(_array[i].address);
        if (
          _array[i].from_address.toLowerCase() === walletAddress.toLowerCase()
        ) {
          txLog = {
            symbol: tokenSymbol[0].symbol,
            date: _array[i].block_timestamp,
            hash: _array[i].transaction_hash,
            value: tokenValue(_array[i].value, tokenSymbol[0].decimals),
            type: "sent",
          };
        } else if (
          _array[i].to_address.toLowerCase() === walletAddress.toLowerCase()
        ) {
          txLog = {
            symbol: tokenSymbol[0].symbol,
            date: _array[i].block_timestamp,
            hash: _array[i].transaction_hash,
            value: tokenValue(_array[i].value, tokenSymbol[0].decimals),
            type: "received",
          };
        }
        datas.push(txLog);
      }
    } else {
      for (let i = 0; i < _array.length; i++) {
        let txLog = {};
        let tokenSymbol = await getTokenInfo(_array[0].address);
        if (
          _array[i].from_address.toLowerCase() === walletAddress.toLowerCase()
        ) {
          txLog = {
            symbol: tokenSymbol[0].symbol,
            date: _array[i].block_timestamp,
            hash: _array[i].transaction_hash,
            value: tokenValue(_array[i].value, tokenSymbol[0].decimals),
            type: "sent",
          };
        } else if (
          _array[i].to_address.toLowerCase() === walletAddress.toLowerCase()
        ) {
          txLog = {
            symbol: tokenSymbol[0].symbol,
            date: _array[i].block_timestamp,
            hash: _array[i].transaction_hash,
            value: tokenValue(_array[i].value, tokenSymbol[0].decimals),
            type: "received",
          };
        }
        datas.push(txLog);
      }
    }

    console.log(datas);
    setERC20Transfers(datas);
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center py-4">
          <Spinner animation="border" variant="success" size="lg" />
        </div>
      )}
      {!isLoading && (
        <Table responsive className="transfer-table text-center text-white">
          <thead>
            <tr>
              <th>Token</th>
              <th>Date</th>
              <th>Value</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {ERC20Transfers &&
              ERC20Transfers.length > 0 &&
              ERC20Transfers.map((item, index) => (
                <tr key={index}>
                  <td>{item.symbol}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.type === "sent" ? (
                      <span
                        className="text-danger"
                        style={{ fontWeight: "bold" }}
                      >
                        <i className="bi bi-arrow-return-right"></i>{" "}
                        {item.value}
                      </span>
                    ) : (
                      <span
                        className="text-success"
                        style={{ fontWeight: "bold" }}
                      >
                        <i className="bi bi-arrow-return-left"></i> {item.value}
                      </span>
                    )}
                  </td>
                  <td>
                    <a
                      className="activity-a"
                      href={`https://bscscan.com/tx/${item.hash}`}
                      target="_blank"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {ERC20Transfers && ERC20Transfers.length === 0 && (
        <div className="d-flex justify-content-center" style={{ color: '#FFFFFF' }}>
          There is no transaction yet.
        </div>
      )}
    </>
  );
}

export default ERC20Transfer;
