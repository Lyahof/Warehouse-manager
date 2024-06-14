import Spinner from "../../ui/Spinner";
import IndigoItemRow from "./IndigoItemRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useIndigo } from "./useIndigo";
import { useSearchContext } from "../../contexts/SearhContext";
import { useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import exportToExcel from "../excel/exportToExcel";
import { SiMicrosoftexcel } from "react-icons/si";

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
      <Table columns="3.9fr 0.6fr 0.7fr 0.6fr 0.45fr 0.45fr 0.2fr">
        <Table.Header>
          <div>Наименование</div>
          <div>Количество</div>
          <div>Пополнение</div>
          <div>Артикул</div>
          <div></div>
          <div></div>
          <Button
            size="small"
            variation="secondary"
            onClick={() => exportToExcel(indigoItems)}
          >
            <SiMicrosoftexcel />
          </Button>
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
