import AddOther from "../features/others/AddOther";
import OthersTable from "../features/others/OthersTable";
import Row from "../ui/Row";
import TableOperations from "../ui/TableOperations";

function Others() {
  return (
    <>
      <Row type="horizontal">
        <TableOperations />
        <AddOther />
      </Row>
      <Row>
        <OthersTable />
      </Row>
    </>
  );
}

export default Others;
