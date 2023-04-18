import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from "react-moralis";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID_MAINNET;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL_MAINNET;
// const appId = "XNJz52oSGKfpg32TKYzGo4NkgPKm4nGcLCbfdFk0";
// const serverUrl = "https://g0tzglyv4zux.usemoralis.com:2053/server";
// basename="template_react"
ReactDOM.render(
	<BrowserRouter>
		<MoralisProvider appId={appId} serverUrl={serverUrl}>
			<App />
		</MoralisProvider>
	</BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
