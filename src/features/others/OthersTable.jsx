import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import OtherItemRow from "./OtherItemRow";
import { useOthers } from "./useOthers";
import { useSearchContext } from "../../contexts/SearhContext";
import { useSearchParams } from "react-router-dom";

function OthersTable() {
  const { others, isLoading } = useOthers();
  const { searchQuery } = useSearchContext();

  // Filter
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("replenishment") || "all";

  let filteredOthers;

  if (filterValue === "all") {
    filteredOthers = others;
  } else if (filterValue === "no-replenishment") {
    filteredOthers = others?.filter(
      (item) => item.minVal <= item.totalQuantity
    );
  } else if (filterValue === "need-replenishment") {
    filteredOthers = others?.filter((item) => item.minVal > item.totalQuantity);
  }

  // Search
  if (searchQuery) {
    filteredOthers = filteredOthers?.filter((item) => {
      return item.otherName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  // Sort By
  const sortBy = searchParams.get("sortBy") || "totalQuantity-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedOthers = filteredOthers?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="2.7fr 0.8fr 1fr 0.8fr 0.45fr 0.45fr 0.4fr">
        <Table.Header>
          <div>Наименование</div>
          <div>Количество</div>
          <div>Пополнение</div>
          <div>Артикул</div>
          <div></div>
          <div></div>
          <div></div>
        </Table.Header>

        <Table.Body
          render={(otherItem) => (
            <OtherItemRow otherItem={otherItem} key={otherItem.id} />
          )}
          data={sortedOthers}
        />
      </Table>
    </Menus>
  );
}

export default OthersTable;
