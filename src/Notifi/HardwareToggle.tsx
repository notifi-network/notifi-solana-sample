import React from "react";
import { useNotifiSubscriptionContext } from "@notifi-network/notifi-react-card";

type Props = Readonly<{
  disabled: boolean;
}>;

export const HardwareToggle: React.FC<Props> = ({ disabled }: Props) => {
  const { useHardwareWallet, setUseHardwareWallet } =
    useNotifiSubscriptionContext();

  return (
    <div>
      <span>Use Hardware Wallet for Log In</span>
      <input
        disabled={disabled}
        type="checkbox"
        checked={useHardwareWallet}
        onChange={(e) => {
          setUseHardwareWallet(e.target.checked);
        }}
      />
    </div>
  );
};
