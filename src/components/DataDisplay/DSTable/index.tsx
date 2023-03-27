import { Table } from '@chakra-ui/react';

import DSTableBody from './TableBody';
import DSTableHead from './TableHead';
import ColumnProps from './tableProps';
import { useSortableTable } from './useSortableTable';

interface DSTableProps {
  data: any;
  columns: ColumnProps[];
  editItem: (data: any) => Promise<void>;
  removeItem: (title: string) => void;
}

export default function DSTable({ data, columns, editItem, removeItem }: DSTableProps) {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <Table>
      <DSTableHead {...{ columns, handleSorting }} />
      <DSTableBody {...{ columns, tableData, editItem, removeItem }} />
    </Table>
  );
}
