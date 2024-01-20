import { Select, Spinner } from '@chakra-ui/react';
import { css } from '@emotion/react';
import React, { useEffect } from 'react';

import useStore from '@/store/store';
import { DropdownValue } from '@/types/index';

const OrderDropdown: React.FC = () => {
  const { dropdownValues, fetchOrders, setSelectedOrder, loading } = useStore();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOrder(selectedValue);
  };

  useEffect(() => {
    // Fetch orders
    fetchOrders();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner thickness="3px" speed="0.65s" emptyColor="gray.100" color="#de392c" size="sm" />
      ) : (
        <Select css={dropdownStyle} placeholder="Seleccione su pedido" onChange={handleSelectChange}>
          {dropdownValues.map((item: DropdownValue) => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
};

const dropdownStyle = css`
  border: 3px solid #e1e1e1;
  border-radius: 6px;
  height: 47px;
  cursor: pointer;
  font-size: 16px;
  color: #343947;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #e2554a;
    box-shadow: none !important;
  }

  &:active {
    border-color: #e2554a;
    box-shadow: none !important;
  }

  &:focus {
    border-color: #e2554a;
    box-shadow: none !important;
  }

  /* Additional styles for the dropdown options */
  option {
    padding: 32px;
  }
`;

export default OrderDropdown;
