import React from "react";
import type { MessageSigner } from "@notifi-network/notifi-core";
import {
  NotifiSubscriptionCard,
  NotifiSubscriptionContextProvider,
} from "@notifi-network/notifi-react-card";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export const Remote: React.FC = () => {
  const { connection } = useConnection();
  const { wallet, sendTransaction } = useWallet();
  const adapter = wallet?.adapter;
  const publicKey = adapter?.publicKey?.toBase58() ?? null;

  if (publicKey === null) {
    return null;
  }

  return (
    <NotifiSubscriptionContextProvider
      dappAddress="notifi"
      env="Development"
      signer={adapter as MessageSigner}
      walletPublicKey={publicKey}
      connection={connection}
      sendTransaction={sendTransaction}
    >
      <NotifiSubscriptionCard cardId="4f8703abf148408abf0fdc9b315a85f3" />
    </NotifiSubscriptionContextProvider>
  );
};
