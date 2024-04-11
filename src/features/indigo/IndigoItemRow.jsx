import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiTrash } from "react-icons/hi2";
import { FaCalendarMinus, FaCalendarPlus } from "react-icons/fa";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import IndigoReceiptForm from "./IndigoReceiptForm";
import IndigoExpenseForm from "./IndigoExpenseForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteIndigo } from "./useDeleteIndigo";

const StyledndigoName = styled.div`
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

function IndigoItemRow({ indigoItem }) {
  const navigate = useNavigate();
  const { deleteIndigo, isDeleting } = useDeleteIndigo();

  const { id, indigoName, totalQuantity, minVal, vendorCode } = indigoItem;
  const processedTotalQuantity = totalQuantity === null ? 0 : totalQuantity;

  return (
    <Table.Row>
      <StyledndigoName>{indigoName}</StyledndigoName>
      <Quantity
        type={
          processedTotalQuantity > 0 && processedTotalQuantity < minVal
            ? "yellow"
            : processedTotalQuantity >= minVal
            ? "green"
            : "red"
        }
      >
        {processedTotalQuantity} шт.
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
        <Modal.Open opens="update-indigo-plus">
          <button>Добавить</button>
        </Modal.Open>
        <Modal.Window name="update-indigo-plus">
          <IndigoReceiptForm
            indigoName={indigoName}
            totalQuantity={processedTotalQuantity}
            id={id}
            vendorCode={vendorCode}
          />
        </Modal.Window>

        <Modal.Open>
          <button disabled={processedTotalQuantity === 0}>Списать</button>
        </Modal.Open>
        <Modal.Window>
          <IndigoExpenseForm
            indigoName={indigoName}
            totalQuantity={processedTotalQuantity}
            id={id}
            vendorCode={vendorCode}
          />
        </Modal.Window>

        <Menus.Menu>
          <Menus.Toggle id={id} />

          <Menus.List id={id}>
            <Menus.Button
              icon={<FaCalendarPlus />}
              onClick={() => navigate(`/indigo/receipts/${id}`)}
            >
              История получений
            </Menus.Button>

            <Menus.Button
              icon={<FaCalendarMinus />}
              onClick={() => navigate(`/indigo/expences/${id}`)}
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
              resourceName={indigoName}
              onConfirm={() => deleteIndigo(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default IndigoItemRow;
