import Spinner from "../../ui/Spinner";
import EmptyPage from "../../ui/EmptyPage";
import PaintExpenseRow from "./PaintExpenseRow";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import ButtonText from "../../ui/ButtonText";
import Table from "../../ui/Table";

import useMoveBack from "../../hooks/useMoveBack";
import { usePaintExpenses } from "./usePaintExpenses";

function PaintExpensesTable() {
  const { paintExpenses, isLoading } = usePaintExpenses();
  const moveBack = useMoveBack();
  const paintName = paintExpenses?.at(0)?.paintName;

  if (isLoading) return <Spinner />;
  if (paintExpenses.length === 0) return <EmptyPage type="expense" />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">История списаний {paintName}</Heading>
        <ButtonText onClick={moveBack}>&larr;Назад</ButtonText>
      </Row>

      <Table columns="2fr 1fr 0.7fr 1.2fr 0.5fr 0.1fr">
        <Table.Header>
          <div>Наименование</div>
          <div>Дата отпуска</div>
          <div>Отпущено</div>
          <div>Материал получен</div>
          <div>Артикул</div>
        </Table.Header>

        <Table.Body
          render={(paintItem) => (
            <PaintExpenseRow paintItem={paintItem} key={paintItem.id} />
          )}
          data={paintExpenses}
        />
      </Table>
    </>
  );
}

export default PaintExpensesTable;
