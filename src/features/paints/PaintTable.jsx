import Spinner from "../../ui/Spinner";
import PaintItemRow from "./PaintItemRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { usePaints } from "./usePaints";
import { useSearchContext } from "../../contexts/SearhContext";
import { useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import exportToExcel from "../excel/exportToExcel";
import { SiMicrosoftexcel } from "react-icons/si";

function PaintTable() {
  const { paints, isLoading } = usePaints();
  const { searchQuery } = useSearchContext();

  // Filter
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("replenishment") || "all";

  let filteredPaints;

  if (filterValue === "all") {
    filteredPaints = paints;
  } else if (filterValue === "no-replenishment") {
    filteredPaints = paints?.filter(
      (paint) => paint.minVal <= paint.totalQuantity
    );
  } else if (filterValue === "need-replenishment") {
    filteredPaints = paints?.filter(
      (paint) => paint.minVal > paint.totalQuantity
    );
  }

  // Search
  if (searchQuery) {
    filteredPaints = filteredPaints?.filter((paint) => {
      return paint.paintName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  // Sort By
  const sortBy = searchParams.get("sortBy") || "totalQuantity-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedPaints = filteredPaints?.sort(
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
            onClick={() => exportToExcel(paints)}
          >
            <SiMicrosoftexcel />
          </Button>
        </Table.Header>

        <Table.Body
          render={(paint) => <PaintItemRow paint={paint} key={paint.id} />}
          data={sortedPaints}
        />
      </Table>
    </Menus>
  );
}

export default PaintTable;
