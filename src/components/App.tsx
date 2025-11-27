import React from 'react';
import { AlertsTable } from './AlertsTable';
import { useAlerts } from 'hooks/useAlerts';
import { Flex, Heading, Switch, Callout } from '@radix-ui/themes';
import { Theme } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(true);
  const { alerts, loading, error } = useAlerts({
    useFakeData: false,
    fakeTimeout: 0,
  });
  return (
    <Theme
      appearance={darkMode ? 'dark' : 'light'}
      style={{ minHeight: '100%', padding: '0 1rem' }}
    >
      <Flex justify="between" align="center" py="6">
        <div style={{ flex: 1 }} />
        <Heading
          size="8"
          weight="bold"
          style={{
            letterSpacing: '-0.02em',
            fontWeight: 600,
          }}
        >
          Security Alerts
        </Heading>
        <Flex
          align="center"
          gap="2"
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <span style={{ fontSize: '14px' }}>Dark mode</span>
        </Flex>
      </Flex>
      {error && (
        <Callout.Root color="red" size="3" style={{ marginBottom: '1rem' }}>
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>
            <strong>Error loading alerts:</strong> {error}
          </Callout.Text>
        </Callout.Root>
      )}
      <AlertsTable alerts={alerts} isLoading={loading} />
    </Theme>
  );
};

export default App;
