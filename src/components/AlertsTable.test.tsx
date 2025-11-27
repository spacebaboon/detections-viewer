import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AlertsTable } from './AlertsTable';
import { dummyDataAlerts } from 'test/dummyData';

describe('AlertsTable', () => {
  const user = userEvent.setup();

  describe('column headers', () => {
    it.each([
      'Created',
      'Severity',
      'Title',
      'Category',
      'Acknowledged',
      'Resolved',
    ])('renders the table columns', (column) => {
      render(<AlertsTable alerts={dummyDataAlerts} isLoading={false} />);
      expect(
        screen.getByRole('rowheader', { name: column }),
      ).toBeInTheDocument();
    });
  });

  describe('when loading', () => {
    it('renders the loading state', () => {
      render(<AlertsTable alerts={[]} isLoading={true} />);
      expect(screen.getByLabelText('Loading alerts')).toBeInTheDocument();
    });
  });

  describe('data sorting', () => {
    it('sorts by created at descending by default', async () => {
      render(<AlertsTable alerts={dummyDataAlerts} isLoading={false} />);

      const timestampHeader = screen.getByRole('rowheader', {
        name: 'Created',
      });
      expect(timestampHeader).toHaveAttribute('aria-sort', 'descending');
    });

    it('sorts data when column header clicked', async () => {
      render(<AlertsTable alerts={dummyDataAlerts} isLoading={false} />);

      const categoryHeader = screen.getByRole('rowheader', {
        name: 'Category',
      });
      await user.click(categoryHeader);
      expect(categoryHeader).toHaveAttribute('aria-sort', 'ascending');

      const allRows = screen.getAllByRole('row');
      const numRows = allRows.length;

      expect(numRows).toBe(11); // +1 for header row
      expect(allRows[1].textContent).toMatch(/Malicious behavior on a system/);
      expect(allRows[numRows - 1].textContent).toMatch(
        /Unusual software activity/,
      );
    });

    it('toggles data sort direction when column header clicked again', async () => {
      render(<AlertsTable alerts={dummyDataAlerts} isLoading={false} />);

      const idHeader = screen.getByRole('rowheader', { name: 'Severity' });
      await user.click(idHeader);
      expect(idHeader).toHaveAttribute('aria-sort', 'ascending');
      await user.click(idHeader);
      expect(idHeader).toHaveAttribute('aria-sort', 'descending');
    });
  });

  describe('data filtering', () => {
    it('filters data when user types in search input', async () => {
      render(<AlertsTable alerts={dummyDataAlerts} isLoading={false} />);

      expect(screen.getByText(/Emergency Account usage/)).toBeInTheDocument();
      expect(screen.getByText(/Process Injection/)).toBeInTheDocument();

      const searchInput = screen.getByRole('textbox', {
        name: 'Search',
      });
      await userEvent.type(searchInput, 'Process Injection');

      expect(screen.getByText(/Process Injection/)).toBeInTheDocument();
      expect(
        screen.queryByText(/Emergency Account usage/),
      ).not.toBeInTheDocument();
    });

    it('shows a messsage when no rows match the search term', async () => {
      render(<AlertsTable alerts={dummyDataAlerts} isLoading={false} />);

      const searchInput = screen.getByRole('textbox', {
        name: 'Search',
      });
      await userEvent.type(
        searchInput,
        "They're taking the Hobbits to Isengard",
      );

      expect(
        screen.getByText('No results match the search query.'),
      ).toBeInTheDocument();
    });

    it('shows matching results again after search term removed', async () => {
      render(<AlertsTable alerts={dummyDataAlerts} isLoading={false} />);
      expect(screen.getAllByRole('row').length).toBe(11);

      const searchInput = screen.getByRole('textbox', {
        name: 'Search',
      });
      await userEvent.type(searchInput, 'Emergency');

      expect(screen.getAllByRole('row').length).toBe(2);

      await userEvent.clear(searchInput);

      expect(screen.getAllByRole('row').length).toBe(11);
    });
  });
});
