import { useState } from 'react';

import { RiArrowDownLine, RiArrowUpDownLine, RiArrowUpLine } from 'react-icons/ri';

import DSCheckbox from '@/components/Form/DSCheckbox';
import { Th, Thead, Tr } from '@chakra-ui/react';

import DSIconButton from '../../../components/DSIconButton';
import ColumnProps from './tableProps';

export default function DSTableHead({ columns, handleSorting }: any) {
  const [sortField, setSortField] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (accessor: string) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  function checkOrderType(accessor: string, sortable: boolean) {
    if (sortable) {
      if (sortField === accessor && order === 'asc') {
        return 'up';
      } else if (sortField === accessor && order === 'desc') {
        return 'down';
      } else {
        return 'default';
      }
    }
    return '';
  }

  function getIcon(accessor: string, sortable: boolean) {
    switch (checkOrderType(accessor, sortable)) {
      case 'up':
        return RiArrowUpLine;
      case 'down':
        return RiArrowDownLine;
      case 'default':
        return RiArrowUpDownLine;
      default:
        return RiArrowUpDownLine;
    }
  }

  function getLabel(accessor: string, sortable: boolean) {
    switch (checkOrderType(accessor, sortable)) {
      case 'up':
        return 'Crescente';
      case 'down':
        return 'Decrescente';
      case 'default':
        return 'Ordernar';
      default:
        return 'Ordernar';
    }
  }

  return (
    <Thead>
      <Tr>
        {columns.map(({ label, accessor, sortable }: ColumnProps) => {
          if (accessor === 'select') {
            return (
              <Th key={accessor} px="6" color="gray.300" width="8">
                <DSCheckbox colorScheme="primaryColor" iconColor="white" />
              </Th>
            );
          }
          return (
            <Th key={accessor}>
              {label}
              {sortable && (
                <DSIconButton
                  ml="1"
                  aria-label="Sortable"
                  toltipLabel={getLabel(accessor, sortable)}
                  customIcon={getIcon(accessor, sortable)}
                  onClick={sortable ? () => handleSortingChange(accessor) : undefined}
                />
              )}
            </Th>
          );
        })}
      </Tr>
    </Thead>
  );
}
