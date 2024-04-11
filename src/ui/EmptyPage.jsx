import useMoveBack from "../hooks/useMoveBack";
import ButtonText from "./ButtonText";
import Heading from "./Heading";
import Row from "./Row";

function EmptyPage({ type }) {
  const moveBack = useMoveBack();
  const typeOfTransaction = type === "expense" ? "списаний" : "пополнений";

  return (
    <Row type="horizontal">
      <Heading as="h2">{`Не зафиксировано ${typeOfTransaction} данной позиции`}</Heading>
      <ButtonText onClick={moveBack}>&larr;Назад</ButtonText>
    </Row>
  );
}
export default EmptyPage;
