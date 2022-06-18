import React from "react";
import { ConnectedForm } from "./ConnectedForm";
import { useWallet } from "@solana/wallet-adapter-react";
import { MessageSigner } from "@notifi-network/notifi-core";

export const BroadcastForm: React.FC = () => {
  const { wallet } = useWallet();
  const adapter = wallet?.adapter;
  const walletPublicKey = adapter?.publicKey?.toBase58() ?? null;

  if (walletPublicKey === null) {
    return <div>Connect Your Wallet</div>;
  }
  if (adapter === null) {
    return <div>Wallet does not support signing</div>;
  }

  return (
    <ConnectedForm
      dappAddress="notifi"
      signer={adapter as MessageSigner}
      walletPublicKey={walletPublicKey}
    />
  );
};
