import React from 'react';

import {
  Box,
  Checkbox,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format } from 'date-fns-tz';

export type ActivityListTableProps = {
  title: string;
  data: any[];
  allChecked: boolean;
  onCheckboxChange: (item: any, isChecked: boolean) => void;
};

export const ActivityListTable: React.FC<ActivityListTableProps> = ({ title, data, allChecked, onCheckboxChange }) => {
  return (
    <Box mb={4}>
      <Heading size="md" mb={2}> {title} </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>fav</Th>
            <Th>id</Th>
            <Th>project.name</Th>
            <Th>type</Th>
            <Th>content.summary</Th>
            <Th>createdUser.name</Th>
            <Th>created</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Checkbox
                  isChecked={allChecked}
                  onChange={(e) => onCheckboxChange(item, e.target.checked)}
                />
              </Td>
              <Td>{item.id}</Td>
              <Td>{item.projectName}</Td>
              <Td>{item.type}</Td>
              <Td>{item.contentSummary}</Td>
              <Td>{item.createdUserName}</Td>
              <Td>{format(new Date(item.created), 'yyyy/MM/dd HH:mm:ss')}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

