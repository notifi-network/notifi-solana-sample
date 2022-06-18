import React from 'react';
import type { MessageSigner } from '@notifi-network/notifi-core';
import { NotifiCard } from '@notifi-network/notifi-react-card';
import { useWallet } from '@solana/wallet-adapter-react';

import { NotifiCardContents } from './NotifiCardContents';

export const Notifi: React.FC = () => {
  const { wallet } = useWallet();
  const adapter = wallet?.adapter;
  const publicKey = adapter?.publicKey?.toBase58() ?? null;

  return (
    <NotifiCard
      dappAddress="notifi"
      env="Development"
      signer={adapter as MessageSigner}
      walletPublicKey={publicKey}
    >
      <NotifiCardContents />
    </NotifiCard>
  );
};