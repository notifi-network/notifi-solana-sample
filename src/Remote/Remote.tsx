import React from "react";
import type { MessageSigner } from "@notifi-network/notifi-core";
import {
  NotifiContext,
  NotifiSubscriptionCard,
} from "@notifi-network/notifi-react-card";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import '@notifi-network/notifi-react-card/dist/index.css';

export const Remote: React.FC = () => {
  const { connection } = useConnection();
  const { wallet, sendTransaction } = useWallet();
  const adapter = wallet?.adapter;
  const publicKey = adapter?.publicKey?.toBase58() ?? null;

  if (publicKey === null) {
    return null;
  }

  return (
    <NotifiContext
      dappAddress="junitest.xyz"
      walletBlockchain="SOLANA"
      env="Development"
      signer={adapter as MessageSigner}
      walletPublicKey={publicKey}
      connection={connection}
      sendTransaction={sendTransaction}
    >
      <NotifiSubscriptionCard cardId="ea0cd922cc4f45c39ccb59a2ef8f0e5f" darkMode />
    </NotifiContext>
  );
};
