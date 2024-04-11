import Spinner from "../../ui/Spinner";
import IndigoItemRow from "./IndigoItemRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useIndigo } from "./useIndigo";
import { useSearchContext } from "../../contexts/SearhContext";
import { useSearchParams } from "react-router-dom";

function IndigoTable() {
  const { indigoItems, isLoading } = useIndigo();
  const { searchQuery } = useSearchContext();

  // Filter
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("replenishment") || "all";

  let filteredIndigo;

  if (filterValue === "all") {
    filteredIndigo = indigoItems;
  } else if (filterValue === "no-replenishment") {
    filteredIndigo = indigoItems?.filter(
      (item) => item.minVal <= item.totalQuantity
    );
  } else if (filterValue === "need-replenishment") {
    filteredIndigo = indigoItems?.filter(
      (item) => item.minVal > item.totalQuantity
    );
  }

  // Search
  if (searchQuery) {
    filteredIndigo = filteredIndigo?.filter((item) => {
      return item.indigoName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  // Sort By
  const sortBy = searchParams.get("sortBy") || "totalQuantity-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedIndigo = filteredIndigo?.sort(
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
          render={(indigoItem) => (
            <IndigoItemRow indigoItem={indigoItem} key={indigoItem.id} />
          )}
          data={sortedIndigo}
        />
      </Table>
    </Menus>
  );
}

export default IndigoTable;
