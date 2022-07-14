import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { ConnectedHooks } from "./ConnectedHooks";

export const Hooks: React.FC = () => {
  const { wallet } = useWallet();
  const adapter = wallet?.adapter;
  const walletPublicKey = adapter?.publicKey?.toBase58() ?? null;

  if (walletPublicKey === null) {
    return <div>Connect Your Wallet</div>;
  }
  if (adapter === undefined) {
    return <div>Wallet does not support signing</div>;
  }
  return (
    <ConnectedHooks wallet={adapter} walletPublicKey={walletPublicKey} />
  );
};
