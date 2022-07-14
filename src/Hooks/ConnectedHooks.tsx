import { useNotifiClient } from "@notifi-network/notifi-react-hooks";
import { MessageSignerWalletAdapterProps, WalletAdapter } from "@solana/wallet-adapter-base";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import React, { useCallback, useState } from "react";

export type Props = Readonly<{
  walletPublicKey: string;
  wallet: WalletAdapter;
}>;

export const ConnectedHooks: React.FC<Props> = ({
  wallet,
  walletPublicKey,
}: React.PropsWithChildren<Props>) => {
  const {
    createBonfidaAuctionSource,
    data,
    isAuthenticated,
    logOut,
    logIn,
  } = useNotifiClient({
    dappAddress: "notifi",
    walletPublicKey,
    env: "Development",
  });

  const sources = data?.sources?.filter(it => it.type === 'SOLANA_BONFIDA_AUCTION');

  const [error, setError] = useState<unknown>(undefined);

  const begin = useCallback(async () => {
    try {
        await logIn(wallet as any);
    } catch (e: unknown) {
        console.log('Error in logIn', e);
        setError(e);
    }
  }, [logIn, wallet]);

  const createSource = useCallback(async () => {
    try {
      await createBonfidaAuctionSource({
        auctionAddressBase58: 'addressBase58',
        auctionName: 'auctionName'
      });
    } catch (e: unknown) {
      console.log('Error in createSource', e);
      setError(e);
    }
  }, [createBonfidaAuctionSource]);

  return (
    <div>
      <button onClick={logOut}>Log Out</button>
      <div>{`IsAuthenticated: ${isAuthenticated}`}</div>
      <button onClick={begin}>Begin</button>
      <div>{`Source: ${JSON.stringify(sources)}`}</div>
      <button onClick={createSource}>CreateSource</button>
      <div>{`Error: ${error}`}</div>
      <div>{`Data: ${JSON.stringify(data)}`}</div>
    </div>
  );
};
