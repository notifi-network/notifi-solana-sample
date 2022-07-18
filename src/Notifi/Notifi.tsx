import React from "react";
import type { MessageSigner } from "@notifi-network/notifi-core";
import { NotifiCard } from "@notifi-network/notifi-react-card";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { NotifiCardContents } from "./NotifiCardContents";

export const Notifi: React.FC = () => {
  const { connection } = useConnection();
  const { wallet, sendTransaction } = useWallet();
  const adapter = wallet?.adapter;
  const publicKey = adapter?.publicKey?.toBase58() ?? null;

  return (
    <NotifiCard
      dappAddress="hyperspace.xyz"
      env="Development"
      signer={adapter as MessageSigner}
      walletPublicKey={publicKey}
      connection={connection}
      sendTransaction={sendTransaction}
    >
      <NotifiCardContents />
    </NotifiCard>
  );
};
