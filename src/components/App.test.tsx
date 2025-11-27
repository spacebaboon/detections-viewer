import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

// Mock the useAlerts hook
vi.mock('hooks/useAlerts', () => ({
  useAlerts: () => ({
    alerts: [],
    loading: false,
    error: null,
  }),
}));

describe('<App />', () => {
  it('renders the App', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Security Alerts/ }),
    ).toBeInTheDocument();
  });
});
