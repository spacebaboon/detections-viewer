import { FC, useState } from 'react';
import { Alert } from 'types/types';
import { Table, TextField } from '@radix-ui/themes';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';

interface AlertsTableProps {
  alerts: Alert[];
  isLoading: boolean;
}

export const AlertsTable: FC<AlertsTableProps> = ({ alerts, isLoading }) => {
  // Use created at as initial sort order, to show most recent first
  const [sortColumn, setSortColumn] = useState<keyof Alert | null>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const [searchTerm, setSearchTerm] = useState('');

  const handleSortClick = (column: keyof Alert) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedAlerts = [...alerts].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return sortDirection === 'asc' ? 1 : -1;
    if (bValue == null) return sortDirection === 'asc' ? -1 : 1;

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredAlerts = sortedAlerts.filter((alert) => {
    return (
      alert.severity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.categoryRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TextField.Root
        placeholder="Search the alerts..."
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <TableHeader
              id="createdAt"
              title="Created at"
              handleSortClick={handleSortClick}
              sortDirection={sortDirection}
              sortColumn={sortColumn}
            />
            <TableHeader
              id="severity"
              handleSortClick={handleSortClick}
              sortDirection={sortDirection}
              sortColumn={sortColumn}
            />
            <TableHeader
              id="title"
              handleSortClick={handleSortClick}
              sortDirection={sortDirection}
              sortColumn={sortColumn}
            />
            <TableHeader
              id="categoryRef"
              title="Category"
              handleSortClick={handleSortClick}
              sortDirection={sortDirection}
              sortColumn={sortColumn}
            />
            <TableHeader
              id="status"
              handleSortClick={handleSortClick}
              sortDirection={sortDirection}
              sortColumn={sortColumn}
            />
            <TableHeader
              id="acknowledgedAt"
              title="Acknowledged at"
              handleSortClick={handleSortClick}
              sortDirection={sortDirection}
              sortColumn={sortColumn}
            />
            <TableHeader
              id="resolvedAt"
              title="Resolved at"
              handleSortClick={handleSortClick}
              sortDirection={sortDirection}
              sortColumn={sortColumn}
            />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredAlerts.length === 0 ? (
            <div>No results match the search query.</div>
          ) : (
            filteredAlerts.map((alert) => (
              <Table.Row key={alert.id}>
                <Table.Cell>{alert.createdAt}</Table.Cell>
                <Table.Cell>{alert.severity}</Table.Cell>
                <Table.Cell>{alert.title}</Table.Cell>
                <Table.Cell>{alert.categoryRef}</Table.Cell>
                <Table.Cell>{alert.status}</Table.Cell>
                <Table.Cell>{alert.acknowledgedAt}</Table.Cell>
                <Table.Cell>{alert.resolvedAt}</Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
};

interface TableHeaderProps {
  id: keyof Alert;
  title?: string;
  handleSortClick: (id: keyof Alert) => void;
  sortColumn: keyof Alert | null;
  sortDirection: 'asc' | 'desc';
}

const TableHeader: FC<TableHeaderProps> = ({
  id,
  title,
  handleSortClick,
  sortDirection,
  sortColumn,
}) => {
  const displayName = title
    ? title
    : String(id).charAt(0).toUpperCase() + String(id).slice(1);

  const ariaSortValue =
    sortColumn === id
      ? sortDirection === 'asc'
        ? 'ascending'
        : 'descending'
      : 'none';

  return (
    <Table.RowHeaderCell
      onClick={() => handleSortClick(id)}
      aria-sort={ariaSortValue}
    >
      <div className="flex flex-row items-center justify-between">
        {displayName}
        {sortColumn === id ? (
          sortDirection === 'asc' ? (
            <ChevronUpIcon aria-hidden="true" />
          ) : (
            <ChevronDownIcon aria-hidden="true" />
          )
        ) : null}
      </div>
    </Table.RowHeaderCell>
  );
};
