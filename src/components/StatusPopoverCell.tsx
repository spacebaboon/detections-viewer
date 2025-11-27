import { FC } from 'react';
import { Table, Popover, Text, Flex, Badge } from '@radix-ui/themes';

interface StatusPopoverCellProps {
  timestamp: string | null;
  user: string | null;
  label: string;
}

export const StatusPopoverCell: FC<StatusPopoverCellProps> = ({
  timestamp,
  user,
  label,
}) => {
  if (!timestamp) {
    return (
      <Table.Cell>
        <Badge color="gray">No</Badge>
      </Table.Cell>
    );
  }

  return (
    <Table.Cell>
      <Popover.Root>
        <Popover.Trigger>
          <Badge color="green" style={{ cursor: 'pointer' }}>
            Yes
          </Badge>
        </Popover.Trigger>
        <Popover.Content>
          <Flex direction="column" gap="2">
            <Text size="2" weight="bold">
              {label}
            </Text>
            <Flex direction="column" gap="1">
              <Text size="1" color="gray">
                Date
              </Text>
              <Text size="2">{timestamp}</Text>
            </Flex>
            {user && (
              <Flex direction="column" gap="1">
                <Text size="1" color="gray">
                  By
                </Text>
                <Text size="2">{user}</Text>
              </Flex>
            )}
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Table.Cell>
  );
};
