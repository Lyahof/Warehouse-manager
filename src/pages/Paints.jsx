import Row from "../ui/Row";
import PaintTable from "../features/paints/PaintTable";
import AddPaint from "../features/paints/AddPaint";
import TableOperations from "../ui/TableOperations";

function Paints() {
  return (
    <>
      <Row type="horizontal">
        <TableOperations />
        <AddPaint />
      </Row>
      <Row>
        <PaintTable />
      </Row>
    </>
  );
}

export default Paints;
