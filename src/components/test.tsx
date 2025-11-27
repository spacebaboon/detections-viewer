import { render, screen } from '@testing-library/react';

import App from './App';

describe('<App />', () => {
  it('renders the App', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: /Security Alerts/ }),
    ).toBeInTheDocument();
  });
});
