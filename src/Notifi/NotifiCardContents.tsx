import React from "react";
import {
  NotifiEmailInput,
  NotifiFooter,
  NotifiSmsInput,
  useNotifiSubscribe,
} from "@notifi-network/notifi-react-card";

import { MarketingToggle } from "./MarketingToggle";
import { HardwareToggle } from "./HardwareToggle";

export const NotifiCardContents: React.FC = () => {
  const { loading, subscribe } = useNotifiSubscribe();

  return (
    <>
      <NotifiEmailInput disabled={loading} />
      <NotifiSmsInput disabled={loading} />
      <MarketingToggle disabled={loading} />
      <HardwareToggle disabled={loading} />
      <button
        disabled={loading}
        type="submit"
        onClick={async () => {
          await subscribe();
        }}
      >
        Subscribe
      </button>
      <NotifiFooter />
    </>
  );
};
