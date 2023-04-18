import {
  AvaxLogo,
  PolygonLogo,
  BSCLogo,
  ETHLogo,
} from "../assets/js/walletLogos";
import Metamask from "../assets/img/walletIcons/metamaskWallet.png";
import Coin98 from "../assets/img/walletIcons/Coin98.png";
import WalletConnect from "../assets/img/walletIcons/wallet-connect.svg";
import MathWallet from "../assets/img/walletIcons/MathWallet.svg";
import TokenPocket from "../assets/img/walletIcons/TokenPocket.svg";
import SafePal from "../assets/img/walletIcons/SafePal.svg";

// Wallet Connector List
const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    active: false,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    active: false,
  },
  {
    title: "MathWallet",
    icon: MathWallet,
    connectorId: "injected",
    active: false,
  },
  {
    title: "TokenPocket",
    icon: TokenPocket,
    connectorId: "injected",
    active: false,
  },
  {
    title: "SafePal",
    icon: SafePal,
    connectorId: "injected",
    active: false,
  },
  {
    title: "Coin98",
    icon: Coin98,
    connectorId: "injected",
    active: false,
  },
];

// Available Network List
const networks = [
  {
    key: "0x1",
    value: "Ethereum",
    icon: <ETHLogo />,
    active: false,
  },
  {
    key: "0x38",
    value: "Binance",
    icon: <BSCLogo />,
    active: false,
  },
  {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
    active: false,
  },
  {
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />,
    active: false,
  },
];
export { connectors, networks };
