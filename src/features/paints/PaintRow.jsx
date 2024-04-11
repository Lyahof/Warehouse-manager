import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi2";
import { FaCalendarMinus, FaCalendarPlus } from "react-icons/fa";

import PaintReceiptForm from "./PaintReceiptForm";
import PaintExpenseForm from "./PaintExpenseForm";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { useDeletePaint } from "./useDeletePaint";

const Paint = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

const VendorCode = styled.div`
  font-weight: 500;
`;

const Quantity = styled.div`
  font-weight: 600;
  color: var(--color-${(props) => props.type}-700);
`;

function PaintRow({ paint }) {
  const navigate = useNavigate();
  const { deletePaint, isDeleting } = useDeletePaint();

  const { paintName, vendorCode, totalQuantity, id, minVal } = paint;
  const processedTotalQuantity = totalQuantity === null ? 0 : totalQuantity;

  return (
    <Table.Row>
      <Paint>{paintName}</Paint>
      <Quantity
        type={
          processedTotalQuantity > 0 && processedTotalQuantity < minVal
            ? "yellow"
            : processedTotalQuantity >= minVal
            ? "green"
            : "red"
        }
      >
        {processedTotalQuantity} кг.
      </Quantity>
      <Tag
        type={
          processedTotalQuantity > 0 && processedTotalQuantity < minVal
            ? "yellow"
            : processedTotalQuantity >= minVal
            ? "green"
            : "red"
        }
      >
        {processedTotalQuantity > 0 && processedTotalQuantity < minVal
          ? "заканчивается"
          : processedTotalQuantity >= minVal
          ? "не требуется"
          : "требуется"}
      </Tag>
      <VendorCode>{vendorCode}</VendorCode>

      <Modal>
        <Modal.Open opens="update-plus">
          <button>Добавить</button>
        </Modal.Open>
        <Modal.Window name="update-plus">
          <PaintReceiptForm
            paintName={paintName}
            vendorCode={vendorCode}
            id={id}
            totalQuantity={processedTotalQuantity}
          />
        </Modal.Window>

        <Modal.Open opens="update-minus">
          <button disabled={processedTotalQuantity === 0}>Списать</button>
        </Modal.Open>
        <Modal.Window name="update-minus">
          <PaintExpenseForm
            paintName={paintName}
            vendorCode={vendorCode}
            id={id}
            totalQuantity={processedTotalQuantity}
          />
        </Modal.Window>

        <Menus.Menu>
          <Menus.Toggle id={id} />

          <Menus.List id={id}>
            <Menus.Button
              icon={<FaCalendarPlus />}
              onClick={() => navigate(`/paints/receipts/${id}`)}
            >
              История получений
            </Menus.Button>

            <Menus.Button
              icon={<FaCalendarMinus />}
              onClick={() => navigate(`/paints/expences/${id}`)}
            >
              История списаний
            </Menus.Button>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />} disabled={isDeleting}>
                Удалить строку
              </Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={paintName}
              disabled={isDeleting}
              onConfirm={() => deletePaint(id)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default PaintRow;
