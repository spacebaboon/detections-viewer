import { FC, useState } from 'react';
import { Alert } from 'types/types';
import { Skeleton, Table, TextField } from '@radix-ui/themes';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import TableHeader from './TableHeader';
import { StatusPopoverCell } from './StatusPopoverCell';
import { SeverityCell } from './SeverityCell';

export interface SortState {
  column: keyof Alert;
  direction: 'asc' | 'desc';
}

interface AlertsTableProps {
  alerts: Alert[];
  isLoading: boolean;
}

const toSentenceCase = (str: string): string => {
  return str
    .split('_')
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
    )
    .join(' ');
};

export const AlertsTable: FC<AlertsTableProps> = ({ alerts, isLoading }) => {
  // Use created at as initial sort order, to show most recent first
  const [sortState, setSortState] = useState<SortState | null>({
    column: 'createdAt',
    direction: 'desc',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleSortClick = (column: keyof Alert) => {
    if (sortState?.column === column) {
      setSortState((prev) => ({
        column,
        direction: prev?.direction === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setSortState({
        column,
        direction: 'asc',
      });
    }
  };

  const sortedAlerts = [...alerts].sort((a, b) => {
    if (sortState == null) return 0;
    const aValue = a[sortState.column];
    const bValue = b[sortState.column];

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return sortState.direction === 'asc' ? 1 : -1;
    if (bValue == null) return sortState.direction === 'asc' ? -1 : 1;

    if (aValue < bValue) return sortState.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortState.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredAlerts = sortedAlerts.filter((alert) => {
    return (
      alert.severity +
      alert.title +
      alert.categoryRef +
      alert.status +
      alert.acknowledgedBy +
      alert.resolvedBy
    )
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return (
      <div aria-label="Loading alerts">
        <Skeleton height="40px" mb="2" />
        <Skeleton height="400px" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-[20px] w-[400px]">
        <TextField.Root
          placeholder="Search the alerts..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Slot side="right">
            <Cross2Icon
              height="16"
              width="16"
              onClick={() => setSearchTerm('')}
              cursor="pointer"
            />
          </TextField.Slot>
        </TextField.Root>
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <TableHeader
              id="createdAt"
              title="Created"
              handleSortClick={handleSortClick}
              sortState={sortState}
            />
            <TableHeader
              id="severity"
              handleSortClick={handleSortClick}
              sortState={sortState}
            />
            <TableHeader
              id="title"
              handleSortClick={handleSortClick}
              sortState={sortState}
            />
            <TableHeader
              id="categoryRef"
              title="Category"
              handleSortClick={handleSortClick}
              sortState={sortState}
            />
            <TableHeader
              id="status"
              handleSortClick={handleSortClick}
              sortState={sortState}
            />
            <TableHeader
              id="acknowledgedAt"
              title="Acknowledged"
              handleSortClick={handleSortClick}
              sortState={sortState}
            />
            <TableHeader
              id="resolvedAt"
              title="Resolved"
              handleSortClick={handleSortClick}
              sortState={sortState}
            />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredAlerts.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={7}>
                No results match the search query.
              </Table.Cell>
            </Table.Row>
          ) : (
            filteredAlerts.map((alert) => (
              <Table.Row key={alert.id}>
                <Table.Cell>{alert.createdAt}</Table.Cell>
                <SeverityCell severity={alert.severity} />
                <Table.Cell>{alert.title}</Table.Cell>
                <Table.Cell>{toSentenceCase(alert.categoryRef)}</Table.Cell>
                <Table.Cell>{toSentenceCase(alert.status)}</Table.Cell>
                <StatusPopoverCell
                  timestamp={alert.acknowledgedAt}
                  user={alert.acknowledgedBy}
                  label="Acknowledged"
                />
                <StatusPopoverCell
                  timestamp={alert.resolvedAt}
                  user={alert.resolvedBy}
                  label="Resolved"
                />
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
};
