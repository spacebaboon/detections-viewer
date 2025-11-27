import { FC } from 'react';
import { Alert } from 'types/types';

interface AlertsTableProps {
  alerts: Alert[];
  isLoading: boolean;
}

export const AlertsTable: FC<AlertsTableProps> = ({ alerts, isLoading }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>AlertsTable</div>
      {alerts.map((alert) => (
        <div>{JSON.stringify(alert)}</div>
      ))}
    </>
  );
};
