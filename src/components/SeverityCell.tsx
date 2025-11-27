import { FC } from 'react';
import { Table, Flex, Text } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface SeverityCellProps {
  severity: string;
}

const toSentenceCase = (str: string): string => {
  return str
    .split('_')
    .map((word, index) =>
      index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
    )
    .join(' ');
};

export const SeverityCell: FC<SeverityCellProps> = ({ severity }) => {
  const isHigh = severity.toLowerCase() === 'high';

  return (
    <Table.Cell>
      <Flex align="center" gap="1">
        {isHigh && (
          <ExclamationTriangleIcon
            style={{ color: '#e5484d', width: 16, height: 16 }}
          />
        )}
        <Text style={{ color: isHigh ? '#e5484d' : 'inherit' }}>
          {toSentenceCase(severity)}
        </Text>
      </Flex>
    </Table.Cell>
  );
};
