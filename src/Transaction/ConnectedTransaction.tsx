import { useNotifiClient } from "@notifi-network/notifi-react-hooks";
import { WalletAdapter } from "@solana/wallet-adapter-base";
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

export const ConnectedTransaction: React.FC<Props> = ({
  wallet,
  walletPublicKey,
}: React.PropsWithChildren<Props>) => {
  const {
    isAuthenticated,
    logOut,
    beginLoginViaTransaction,
    completeLoginViaTransaction,
  } = useNotifiClient({
    dappAddress: "notifi",
    walletPublicKey,
    env: "Local",
  });

  const [msg, setMsg] = useState<string>("");
  const [sig, setSig] = useState<string>("");

  const begin = useCallback(async () => {
    console.log("Starting begin");
    const { logValue } = await beginLoginViaTransaction();
    console.log("Completing begin", logValue);
    setMsg(logValue);
  }, [beginLoginViaTransaction, setMsg]);

  const makeMemo = useCallback(async () => {
    if (msg === "") {
      throw new Error("Need to begin");
    }

    const connection = new Connection(clusterApiUrl("devnet"));
    const txn = new Transaction();
    txn.add(
      new TransactionInstruction({
        keys: [
          {
            pubkey: new PublicKey(walletPublicKey),
            isSigner: true,
            isWritable: false,
          },
        ],
        data: Buffer.from(msg, "utf-8"),
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      })
    );

    console.log("Starting broadcasted");
    const broadcasted = await wallet.sendTransaction(txn, connection);
    console.log("Completing makeMemo", broadcasted);
    setSig(broadcasted);
  }, [msg, wallet, walletPublicKey]);

  const end = useCallback(async () => {
    if (sig === "") {
        throw new Error('Need to make memo');
    }

    console.log('Starting end');
    const result = await completeLoginViaTransaction({
        transactionSignature: sig,
    });
    console.log('Completing end', result);
  }, [completeLoginViaTransaction, sig]);

  return (
    <div>
      <button onClick={logOut}>Log Out</button>
      <div>{`IsAuthenticated: ${isAuthenticated}`}</div>
      <button onClick={begin}>Begin</button>
      <div>{`Message: ${msg}`}</div>
      <button onClick={makeMemo}>Make Memo</button>
      <div>{`Signature: ${sig}`}</div>
      <button onClick={end}>End</button>
    </div>
  );
};
