import useMoveBack from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import EmptyPage from "../../ui/EmptyPage";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import IndigoExpenseRow from "./IndigoExpenseRow";
import { useIndigoExpenses } from "./useIndigoExpenses";

function IndigoExpensesTable() {
  const { IndigoItemExpenses, isLoading } = useIndigoExpenses();
  const moveBack = useMoveBack();
  const indigoName = IndigoItemExpenses?.at(0)?.indigoName;

  if (isLoading) return <Spinner />;
  if (IndigoItemExpenses.length === 0) return <EmptyPage type="expense" />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">История списаний {indigoName}</Heading>
        <ButtonText onClick={moveBack}>&larr;Назад</ButtonText>
      </Row>

      <Table columns="2fr 0.8fr 0.6fr 1fr 1fr 0.5fr 0.1fr">
        <Table.Header>
          <div>Наименование</div>
          <div>Дата отпуска</div>
          <div>Отпущено</div>
          <div>Материал отпущен</div>
          <div>Материал получен</div>
          <div>Артикул</div>
        </Table.Header>

        <Table.Body
          render={(indigoItem) => (
            <IndigoExpenseRow
              indigoItemExpense={indigoItem}
              key={indigoItem.id}
            />
          )}
          data={IndigoItemExpenses}
        />
      </Table>
    </>
  );
}

export default IndigoExpensesTable;
