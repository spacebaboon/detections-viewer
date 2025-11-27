import { useEffect, useState } from 'react';
import { dummyDataAlerts } from 'test/dummyData';
import { Alert } from 'types/types';

export const BASE_API_URL = 'https://front.heyering.com';

export const useAlerts = (options?: {
  useFakeData?: boolean;
  fakeTimeout?: number;
}) => {
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

      const params: Record<string, string> = {
        page: '0',
        limit: '100',
      };
      const queryString = new URLSearchParams(params).toString();

      try {
        const res = await fetch(BASE_API_URL + `/detections?${queryString}`, {
          headers: {
            Authorization: import.meta.env.VITE_AUTH_HEADER,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        setAlerts(json);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === 'string'
              ? err
              : JSON.stringify(err) || 'Unknown error';

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.useFakeData, options?.fakeTimeout]);

  return { alerts, loading, error };
};
