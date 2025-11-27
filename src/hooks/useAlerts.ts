import { useEffect, useState } from 'react';
import { dummyDataAlerts } from 'test/dummyData';
import { Alert } from 'types/types';

export const PAGE_SIZE = 50;

interface UseAlertsOptions {
  useFakeData?: boolean;
  fakeTimeout?: number;
}

const isValidAlert = (data: unknown): data is Alert => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'title' in data &&
    'severity' in data &&
    'status' in data
  );
};

export const useAlerts = (options?: UseAlertsOptions) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { useFakeData = false, fakeTimeout = 0 } = options || {};

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (fakeTimeout) {
        await new Promise((resolve) => setTimeout(resolve, fakeTimeout));
      }

      if (useFakeData) {
        setAlerts(dummyDataAlerts);
        setLoading(false);
        return;
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const authHeader = import.meta.env.VITE_AUTH_HEADER;

        if (!apiUrl) {
          throw new Error('Configuration error: API URL not set');
        }

        if (!authHeader) {
          throw new Error('Configuration error: Auth header not set');
        }

        const url = new URL('/detections', apiUrl);
        url.searchParams.append('page', '0');
        url.searchParams.append('limit', PAGE_SIZE.toString());

        const res = await fetch(url.toString(), {
          headers: {
            Authorization: authHeader,
          },
        });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json = await res.json();

        if (!Array.isArray(json) || !json.every(isValidAlert)) {
          throw new Error('Invalid API response format');
        }

        setAlerts(json);
      } catch (err) {
        console.error('Failed to fetch alerts:', err);
        setError('Failed to load alerts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.useFakeData, options?.fakeTimeout]);

  return { alerts, loading, error };
};
