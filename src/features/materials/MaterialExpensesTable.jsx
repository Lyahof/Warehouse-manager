import useMoveBack from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import EmptyPage from "../../ui/EmptyPage";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import MaterialExpenseRow from "./MaterialExpenseRow";
import { useMaterialExpenses } from "./useMaterialExpenses";

function MaterialExpensesTable() {
  const { materialExpenses, isLoading } = useMaterialExpenses();
  const moveBack = useMoveBack();
  const materialName = materialExpenses?.at(0)?.materialName;
  const materialWidth = materialExpenses?.at(0)?.materialWidth;

  if (isLoading) return <Spinner />;
  if (materialExpenses.length === 0) return <EmptyPage type="expense" />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">
          История списаний {materialName} {materialWidth}мм
        </Heading>
        <ButtonText onClick={moveBack}>&larr;Назад</ButtonText>
      </Row>

      <Table columns="2fr 1fr 0.7fr 1.2fr 0.5fr 0.1fr">
        <Table.Header>
          <div>Наименование</div>
          <div>Отпущено</div>
          <div>Дата отпуска</div>
          <div>Материал получен</div>
          <div>Артикул</div>
        </Table.Header>

        <Table.Body
          render={(material) => (
            <MaterialExpenseRow material={material} key={material.id} />
          )}
          data={materialExpenses}
        />
      </Table>
    </>
  );
}

export default MaterialExpensesTable;
