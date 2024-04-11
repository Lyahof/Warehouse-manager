import Spinner from "../../ui/Spinner";
import EmptyPage from "../../ui/EmptyPage";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonText from "../../ui/ButtonText";
import useMoveBack from "../../hooks/useMoveBack";
import Table from "../../ui/Table";
import MaterialReceiptRow from "./MaterialReceiptRow";
import { useMaterialsReceipts } from "./useMaterialReceipts";

function MaterialReceiptsTable() {
  const { data, isLoading } = useMaterialsReceipts();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (data.length === 0) return <EmptyPage type="receipt" />;

  const materialName = data?.at(0)?.materialName;
  const materialWidth = data?.at(0)?.materialWidth;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">
          История заказов {materialName} {materialWidth} мм
        </Heading>
        <ButtonText onClick={moveBack}>&larr;Назад</ButtonText>
      </Row>

      <Table columns="1.1fr 0.6fr 0.8fr 0.8fr 0.9fr 0.7fr 0.6fr 0.5fr 0.6fr 0.1fr">
        <Table.Header>
          <p>Поставщик</p>
          <p>Количество</p>
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
          render={(material) => (
            <MaterialReceiptRow material={material} key={material.id} />
          )}
          data={data}
        />
      </Table>
    </>
  );
}
export default MaterialReceiptsTable;
