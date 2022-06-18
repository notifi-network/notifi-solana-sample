import React, { useEffect, useState } from 'react';
import type { AlertConfiguration } from '@notifi-network/notifi-react-card';
import {
  broadcastMessageConfiguration,
  useNotifiSubscriptionContext
} from '@notifi-network/notifi-react-card';

const ALERT_NAME = 'My Marketing Updates';
const ALERT_CONFIGURATION: AlertConfiguration = broadcastMessageConfiguration({
  topicName: `juni__super_topic`,
});

type Props = Readonly<{
  disabled: boolean;
}>;

export const MarketingToggle: React.FC<Props> = ({
  disabled
}: Props) => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const { alerts, setAlertConfiguration } = useNotifiSubscriptionContext();

  useEffect(() => {
    const hasAlert = alerts[ALERT_NAME] !== undefined;
    setEnabled(hasAlert);
  }, [alerts]);

  useEffect(() => {
    if (enabled) {
      setAlertConfiguration(ALERT_NAME, ALERT_CONFIGURATION);
    } else {
      setAlertConfiguration(ALERT_NAME, null);
    }
  }, [enabled, setAlertConfiguration]);

  return (
    <div>
      <span>Sign up for Marketing alerts</span>
      <input
        disabled={disabled}
        type="checkbox"
        checked={enabled}
        onChange={(e) => {
          setEnabled(e.target.checked);
        }}
      />
    </div>
  )
};