import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { MessageSigner } from "@notifi-network/notifi-react-hooks";
import { useNotifiClient } from "@notifi-network/notifi-react-hooks";
import { UserTopic } from "@notifi-network/notifi-core";

export type Props = Readonly<{
  dappAddress: string;
  signer: MessageSigner;
  walletPublicKey: string;
}>;

export const ConnectedForm: React.FC<Props> = ({
  dappAddress,
  signer,
  walletPublicKey,
}) => {
  const [topics, setTopics] = useState<ReadonlyArray<UserTopic>>([]);
  const [topic, setTopic] = useState<UserTopic | undefined>(undefined);
  const shouldFetch = useRef(true);

  const { broadcastMessage, getTopics, logIn, logOut, isAuthenticated } =
    useNotifiClient({
      walletBlockchain: "SOLANA",
      dappAddress,
      walletPublicKey,
      env: "Development",
    });

  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isHolderOnly, setIsHolderOnly] = useState<boolean>(true);

  useEffect(() => {
    if (isAuthenticated && shouldFetch.current) {
      shouldFetch.current = false;

      getTopics()
        .then((topics) => {
          setTopics(topics);
          if (topic === undefined) {
            setTopic(topics[0]);
          }
        })
        .catch((e: unknown) => {
          console.log("Error getting topics", e);
        });
    }

    if (!isAuthenticated) {
      shouldFetch.current = true;
    }
  }, [getTopics, isAuthenticated, topic]);

  const { topicsKeys, topicsMap } = useMemo(() => {
    const map = topics.reduce((m, topic) => {
      if (topic.topicName !== null) {
        m[topic.topicName] = topic;
      }
      return m;
    }, {} as Record<string, UserTopic>);

    const keys = Object.keys(map);
    return {
      topicsKeys: keys,
      topicsMap: map,
    };
  }, [topics]);

  const handleSubmit = useCallback(
    async (t: UserTopic | undefined, s: string, m: string, i: boolean) => {
      if (t === undefined) {
        return;
      }
      try {
        broadcastMessage(
          {
            topic: t,
            subject: s,
            message: m,
            isHolderOnly: i,
          },
          signer
        );
      } catch (e: unknown) {
        console.log("Error during broadcastMessage", e);
      }
    },
    [broadcastMessage, signer]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Send Broadcast Message</h1>
      <select
        value={topic?.topicName ?? ""}
        onChange={(e) => {
          const name = e.target.value;
          setTopic(topicsMap[name]);
        }}
      >
        {topicsKeys.map((key) => {
          return (
            <option key={key} value="key">
              {topicsMap[key].name}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <input
        type="checkbox"
        checked={isHolderOnly}
        onChange={(e) => setIsHolderOnly(e.target.checked)}
      ></input>
      <button
        onClick={() => handleSubmit(topic, subject, message, isHolderOnly)}
      >
        Submit
      </button>
      {isAuthenticated ? (
        <button
          onClick={() => {
            logOut()
              .then(() => console.log("Done"))
              .catch(console.log);
          }}
        >
          Log Out
        </button>
      ) : (
        <button
          onClick={() => {
            logIn(signer)
              .then((user) => console.log("Done", user))
              .catch(console.log);
          }}
        >
          Log In
        </button>
      )}
    </div>
  );
};
