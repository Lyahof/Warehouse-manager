import { HiTrash } from "react-icons/hi2";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { modifyDate } from "../../helpers/modifyDate";
import { useDeletePaintExpense } from "./useDeletePaintExpense";

function PaintExpenseRow({ paintItem }) {
  const {
    id,
    paintId,
    paintName,
    vendorCode,
    receiver,
    distributor,
    shippingDate,
    shippedQuantity,
  } = paintItem;

  const modifiedShippingDate = modifyDate(shippingDate);
  const { deletePaintExpense, isPending } = useDeletePaintExpense();

  return (
    <Modal>
      <Table.Row>
        <p>{paintName}</p>
        <p>{modifiedShippingDate} г</p>
        <p>{shippedQuantity} кг</p>
        <p>{distributor ? distributor : "не указано"}</p>
        <p>{receiver}</p>
        <p>{vendorCode}</p>

        <Modal.Open opens="delete-expence-item">
          <button>
            <HiTrash />
          </button>
        </Modal.Open>
        <Modal.Window name="delete-expence-item">
          <ConfirmDelete
            resourceName="текущее списание"
            onConfirm={() =>
              deletePaintExpense({ id, paintId, shippedQuantity })
            }
            disabled={isPending}
          />
        </Modal.Window>
      </Table.Row>
    </Modal>
  );
}

export default PaintExpenseRow;
