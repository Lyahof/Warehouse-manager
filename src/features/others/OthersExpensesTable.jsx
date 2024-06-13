import useMoveBack from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import EmptyPage from "../../ui/EmptyPage";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import OtherExpenseRow from "./OtherExpenseRow";
import { useOtherExpenses } from "./useOtherExpenses";

function OthersExpensesTable() {
  const { otherExpenses, isLoading } = useOtherExpenses();
  const moveBack = useMoveBack();
  const otherName = otherExpenses?.at(0)?.otherName;

  if (isLoading) return <Spinner />;
  if (otherExpenses.length === 0) return <EmptyPage type="expense" />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">История списаний {otherName}</Heading>
        <ButtonText onClick={moveBack}>&larr;Назад</ButtonText>
      </Row>

      <Table columns="2fr 0.8fr 0.6fr 1fr 1fr 0.5fr 0.1fr">
        <Table.Header>
          <div>Наименование</div>
          <div>Отпущено</div>
          <div>Дата отпуска</div>
          <div>Материал отпущен</div>
          <div>Материал получен</div>
          <div>Артикул</div>
        </Table.Header>

        <Table.Body
          render={(otherItem) => (
            <OtherExpenseRow otherItemExpense={otherItem} key={otherItem.id} />
          )}
          data={otherExpenses}
        />
      </Table>
    </>
  );
}

export default OthersExpensesTable;
