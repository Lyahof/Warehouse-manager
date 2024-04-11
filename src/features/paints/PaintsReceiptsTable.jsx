import Spinner from "../../ui/Spinner";
import EmptyPage from "../../ui/EmptyPage";
import PaintsReceiptRow from "./PaintsReceiptRow";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import useMoveBack from "../../hooks/useMoveBack";
import Table from "../../ui/Table";

import { usePaintReceipts } from "./usePaintReceipts";

function PaintsReceiptsDetails() {
  const { data, isLoading } = usePaintReceipts();
  const moveBack = useMoveBack();

  const paintName = data?.at(0)?.paintName;
  if (isLoading) return <Spinner />;
  if (data.length === 0) return <EmptyPage type="receipt" />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">История пополнений {paintName}</Heading>
        <ButtonText onClick={moveBack}>&larr;Назад</ButtonText>
      </Row>

      <Table columns="1.1fr 0.6fr 0.8fr 0.8fr 0.9fr 0.7fr 0.6fr 0.5fr 0.6fr 0.1fr">
        <Table.Header>
          <p>Поставщик</p>
          <p>Получено</p>
          <p>Дата заказа</p>
          <p>Дата оплаты</p>
          <p>Дата получения</p>
          <p>Стоимость ед.</p>
          <p>Итого</p>
          <p>№ счёта</p>
          <p>Т К</p>
          <p></p>
        </Table.Header>

        <Table.Body
          render={(paintItem) => (
            <PaintsReceiptRow paintItem={paintItem} key={paintItem.id} />
          )}
          data={data}
        />
      </Table>
    </>
  );
}
export default PaintsReceiptsDetails;
