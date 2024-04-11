import AddIndigo from "../features/indigo/AddIndigo";
import IndigoTable from "../features/indigo/IndigoTable";
import Row from "../ui/Row";
import TableOperations from "../ui/TableOperations";

function Indigo() {
  return (
    <>
      <Row type="horizontal">
        <TableOperations />
        <AddIndigo />
      </Row>
      <Row>
        <IndigoTable />
      </Row>
    </>
  );
}

export default Indigo;
