import AddMaterial from "../features/materials/AddMaterial";
import MaterialsTable from "../features/materials/MaterialsTable";
import Row from "../ui/Row";
import TableOperations from "../ui/TableOperations";

function Materials() {
  return (
    <>
      <Row type="horizontal">
        <TableOperations />
        <AddMaterial />
      </Row>
      <Row>
        <MaterialsTable />
      </Row>
    </>
  );
}

export default Materials;
