import React from 'react';
import { AlertsTable } from './AlertsTable';
import { useAlerts } from 'hooks/useAlerts';

const App: React.FC = () => {
  const { alerts, loading, error } = useAlerts({
    useFakeData: true,
    fakeTimeout: 0,
  });
  return (
    <>
      <h1>Security Alerts</h1>
      {error && <p>{error}</p>}
      <AlertsTable alerts={alerts} isLoading={loading} />
    </>
  );
};

export default App;
