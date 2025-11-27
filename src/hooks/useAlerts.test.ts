import { renderHook, act } from '@testing-library/react';
import { Alert } from 'types/types';
import { vi } from 'vitest';
import { BASE_API_URL, useAlerts } from './useAlerts';
import { dummyDataAlerts } from 'test/dummyData';

const mockAlerts: Alert[] = dummyDataAlerts;

describe('useAlerts', () => {
  describe('with successful fetch', () => {
    let result: { current: ReturnType<typeof useAlerts> } | null = null;

    beforeEach(() => {
      vi.restoreAllMocks();
      vi.stubEnv('VITE_AUTH_HEADER', 'TEST_AUTH_HEADER');

      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => mockAlerts,
        }),
      );

      ({ result } = renderHook(() => useAlerts()));
    });

    it('returns the data', async () => {
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result?.current.alerts).toEqual(mockAlerts);
      expect(result?.current.loading).toBe(false);
      expect(result?.current.error).toBe(null);
    });

    it('calls the endpoint with the query params and auth header', () => {
      expect(vi.mocked(fetch)).toHaveBeenCalledWith(
        BASE_API_URL + '/detections?page=0&limit=100',
        expect.objectContaining({
          headers: {
            Authorization: 'TEST_AUTH_HEADER',
          },
        }),
      );
    });

    it('returns loading state while loading', () => {
      expect(result?.current.loading).toBe(true);
    });
  });

  describe('with fetch error', () => {
    beforeEach(() => {
      vi.restoreAllMocks();

      vi.stubGlobal(
        'fetch',
        vi.fn().mockRejectedValue('HTTP 500: Internal Server Error'),
      );
    });

    it('returns errors', async () => {
      const { result } = renderHook(() => useAlerts());
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const error = result?.current.error;
      expect(error).not.toBeNull();
      expect(error).toContain('HTTP 500: Internal Server Error');
    });
  });
});
