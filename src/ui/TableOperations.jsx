import styled from "styled-components";
import { SlMagnifier } from "react-icons/sl";
import Filter from "./Filter";
import SortBy from "./SortBy";
import { useSearchContext } from "../contexts/SearhContext";

const StyledTableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const InputContainer = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  padding: 0.65rem 1.2rem;
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  & svg {
    color: var(--color-brand-600);
  }
`;

const SearchInput = styled.input`
  margin-left: 1rem;
  outline: none;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
    outline-offset: none;
  }
`;

function TableOperations() {
  const { searchQuery, setSearchQuery } = useSearchContext();

  return (
    <StyledTableOperations>
      <InputContainer>
        <SlMagnifier />
        <SearchInput
          placeholder="Поиск"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </InputContainer>
      <Filter
        filterField="replenishment"
        options={[
          { value: "all", label: "Все" },
          { value: "need-replenishment", label: "Требуется заказ" },
          { value: "no-replenishment", label: "Много" },
        ]}
      />
      <SortBy
        options={[
          {
            value: "totalQuantity-asc",
            label: "Сортировать кол-во (больше)",
          },
          {
            value: "totalQuantity-desc",
            label: "Сортировать кол-во (меньше)",
          },
        ]}
      />
    </StyledTableOperations>
  );
}

export default TableOperations;
