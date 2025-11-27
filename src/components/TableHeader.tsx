import { ChevronUpIcon } from '@radix-ui/react-icons';
import { Table, ChevronDownIcon } from '@radix-ui/themes';
import { FC } from 'react';
import { Alert } from 'types/types';
import { SortState } from './AlertsTable';

interface TableHeaderProps {
  id: keyof Alert;
  title?: string;
  handleSortClick: (id: keyof Alert) => void;
  sortState: SortState | null;
}

const TableHeader: FC<TableHeaderProps> = ({
  id,
  title,
  handleSortClick,
  sortState,
}) => {
  const displayName = title
    ? title
    : String(id).charAt(0).toUpperCase() + String(id).slice(1);

  // Determine aria-sort value
  const ariaSortValue =
    sortState?.column === id
      ? sortState?.direction === 'asc'
        ? 'ascending'
        : 'descending'
      : 'none';

  return (
    <Table.RowHeaderCell
      onClick={() => handleSortClick(id)}
      aria-sort={ariaSortValue}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      <div className="flex flex-row items-center justify-between">
        {displayName}
        {sortState?.column === id ? (
          sortState?.direction === 'asc' ? (
            <ChevronUpIcon aria-hidden="true" />
          ) : (
            <ChevronDownIcon aria-hidden="true" />
          )
        ) : null}
      </div>
    </Table.RowHeaderCell>
  );
};

export default TableHeader;
