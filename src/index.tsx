import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NostrProvider } from "nostr-react";

const relayUrls = [
  "wss://nostr-pub.wellorder.net",
  "wss://nos.lol",
  "wss://nostr.mutinywallet.com",
  "wss://relay.mostr.pub",
  "wss://relay.damus.io",
  "wss://relay.snort.social",
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NostrProvider relayUrls={relayUrls} debug={true}>
      <App />
    </NostrProvider>
  </React.StrictMode>
);