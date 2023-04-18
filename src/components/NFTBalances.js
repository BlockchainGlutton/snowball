import React from "react";
import { useMoralis, useNFTBalances } from "react-moralis";
import { Spinner, Card, Button } from "react-bootstrap";
import NFTPLACEHOLDER from "../assets/img/nftplaceholder.png";

function NFTBalances(props) {
  const { data: NFTBalances, isLoading } = useNFTBalances(props);
  if (NFTBalances) {
    console.log(NFTBalances);
  }

  return (
    <div>
      {isLoading && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="success" size="lg" />
        </div>
      )}
      <div className="d-flex justify-content-center py-4">
        {!isLoading && NFTBalances && (
          <div className="nfts row">
            {NFTBalances.result.length > 0 &&
              NFTBalances.result.map((nft, index) => (
                <div
                  className="col-6 d-flex justify-content-center py-2"
                  key={index}
                >
                  <Card className="nft-card text-black">
                    <Card.Img
                      variant="top"
                      src={
                        nft.metadata &&
                        nft.metadata.image &&
                        nft.metadata.image !== ""
                          ? nft.metadata.image
                          : NFTPLACEHOLDER
                      }
                    />
                    <Card.Body>
                      <Card.Title>
                        {nft.metadata && nft.metadata.name}
                      </Card.Title>
                      <Card.Text>
                        {nft.metadata && nft.metadata.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
          </div>
        )}
        {!isLoading && NFTBalances && NFTBalances.result.length === 0 && (
          <div className="text-center">
            <img src={NFTPLACEHOLDER} width="200" style={{ opacity: "0.5" }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NFTBalances;
