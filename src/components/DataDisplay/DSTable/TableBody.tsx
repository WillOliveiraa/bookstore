import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';

import DSButton from '@/components/Form/DSButton';
import DSCheckbox from '@/components/Form/DSCheckbox';
import DSTextView from '@/components/Form/DSTextView';
import { CategoriesUrl } from '@/utils/urls';
import { Flex, Tbody, Td, Tr } from '@chakra-ui/react';

import ColumnProps from './tableProps';

interface DSTableBodyProps {
  tableData: any;
  columns: ColumnProps[];
  editItem: (data: any) => Promise<void>;
  removeItem: (title: string) => void;
}

export default function DSTableBody({
  tableData,
  columns,
  editItem,
  removeItem
}: DSTableBodyProps) {
  function renderActions(data: any) {
    return (
      <Td key={data.id}>
        <Flex gap="2">
          <DSButton
            href={CategoriesUrl.front.create}
            bgColor="secondary.500"
            icon={RiPencilLine}
            iconSize={16}
            onClick={() => editItem(data)}
          >
            Editar
          </DSButton>

          <DSButton
            bgColor="red.500"
            icon={RiDeleteBinLine}
            iconSize={16}
            onClick={() => removeItem(data.title)}
          >
            Excluir
          </DSButton>
        </Flex>
      </Td>
    );
  }

  return (
    <Tbody>
      {tableData.map((data: any) => {
        return (
          <Tr key={data.id}>
            {columns.map(({ accessor, isBold }: ColumnProps) => {
              const tData = data[accessor] ? data[accessor] : '——';

              if (accessor === 'select') {
                return (
                  <Td key={accessor} px={['4', '4', '6']}>
                    <DSCheckbox />
                  </Td>
                );
              } else if (accessor === 'actions') {
                return renderActions(data);
              }

              return (
                <Td key={accessor}>
                  {isBold ? (
                    <DSTextView fontWeight="bold">{tData}</DSTextView>
                  ) : (
                    <DSTextView fontSize="sm" color="gray.300">
                      {tData}
                    </DSTextView>
                  )}
                </Td>
              );
            })}
          </Tr>
        );
      })}
    </Tbody>
  );
}
