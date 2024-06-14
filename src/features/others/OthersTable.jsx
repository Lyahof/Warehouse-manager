import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import OtherItemRow from "./OtherItemRow";
import { useOthers } from "./useOthers";
import { useSearchContext } from "../../contexts/SearhContext";
import { useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import { SiMicrosoftexcel } from "react-icons/si";
import exportToExcel from "../excel/exportToExcel";

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
            onClick={() => exportToExcel(others)}
          >
            <SiMicrosoftexcel />
          </Button>
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
