import { HiTrash } from "react-icons/hi2";

import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { modifyDate } from "../../helpers/modifyDate";
import { useDeleteOtherExpense } from "./useDeleteOtherExpense";

function OtherExpenseRow({ otherItemExpense }) {
  const {
    id,
    otherId,
    otherName,
    vendorCode,
    receiver,
    shippingDate,
    shippedQuantity,
  } = otherItemExpense;

  const modifiedShippingDate = modifyDate(shippingDate);
  const { deleteOtherExpense, isPending } = useDeleteOtherExpense();

  return (
    <Modal>
      <Table.Row>
        <p>{otherName}</p>
        <p>{shippedQuantity} шт.</p>
        <p>{modifiedShippingDate} г</p>
        <p>{receiver}</p>
        <p>{vendorCode}</p>

        <Modal.Open opens="delete-expence-item">
          <button>
            <HiTrash />
          </button>
        </Modal.Open>
        <Modal.Window name="delete-expence-item">
          <ConfirmDelete
            resourceName="текущую строку"
            onConfirm={() =>
              deleteOtherExpense({ id, otherId, shippedQuantity })
            }
            disabled={isPending}
          />
        </Modal.Window>
      </Table.Row>
    </Modal>
  );
}

export default OtherExpenseRow;
