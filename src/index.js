import React from 'react';
import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <Auth0Provider
    domain="dev-j7jssehq.us.auth0.com"
    clientId="z1KtRgnN6SdUne3XXbXKJPlFqJd5iTiY"
    audience='https://richardnordstrom.com'
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
