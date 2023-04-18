import axios from "axios";
import { convertUnixToNormal, convertNormalToUnix } from "../hook/Date";

const ADXX_ADDRESS = "0x1de305515a132db0ed46e9fa2ad2804f066e43e3";
// Axios Configuration
const http_moralis = axios.create({
  baseURL: "https://deep-index.moralis.io/api/v2",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key":
      "RRXVet4p9WSsPA8cmoCWp8ODo42Nu3wXiCEN9kWauSpCecPJpgNJY6Oqqc1MyA6w",
  },
});
const http_pancakeswap = axios.create({
  baseURL: "https://api.pancakeswap.info/api/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

const http_coingecko = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins",
  headers: {
    "Content-Type": "application/json",
  },
});

//---------------------API END POINT------------------//

export const getTokenBNBPrice = async () => {
  const TOKEN_URL = `/tokens/${ADXX_ADDRESS}`;
  const response = await http_pancakeswap.get(TOKEN_URL);
  return response.data;
};

export const getBalanceOfADXX = async (_address) => {
  const COIN_URL = `${_address}/erc20?chain=0x38`;
  const response = await http_moralis.get(COIN_URL);
  let ADXX = response.data.filter((coin, index) => {
    return coin.token_address.toLowerCase() === ADXX_ADDRESS.toLowerCase();
  });
  return ADXX[0];
};

export const getTokenInfo = async (_address) => {
  const TOKEN_URL = `/erc20/metadata?chain=bsc&addresses=${_address}`;
  const response = await http_moralis.get(TOKEN_URL);
  return response.data;
};

export const getNativeCoinInfo = async (_id) => {
  const ENDPOINT = `/${_id}`;
  const response = await http_coingecko.get(ENDPOINT);
  return response.data;
};

const getPrevDate = (_date, _duration) => {
  const prevDate = new Date(_date.valueOf() - 86400000 * _duration);

  return prevDate;
};

export const getTokenPriceHistory = async (_duration) => {
  let startStandardTime = getPrevDate(Date.now(), _duration);
  let startTime = convertNormalToUnix(startStandardTime);
  let endTime = convertNormalToUnix(Date.now());
  let priceHistory = [];
  await fetch(
    new Request("https://api.livecoinwatch.com/coins/single/history"),
    {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        "x-api-key": process.env.REACT_APP_LIVE_WATCH_KEY,
      }),
      body: JSON.stringify({
        currency: "USD",
        code: "ADXX",
        start: startTime * 1000,
        end: endTime * 1000,
        meta: true,
      }),
    }
  )
    .then((res) => res.json())
    .then((res) => {
      priceHistory = res;
    });

  return priceHistory;
};
