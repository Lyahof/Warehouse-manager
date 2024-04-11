import { HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { modifyDate } from "../../helpers/modifyDate";
import { useDeleteIndigoExpense } from "./useDeleteIndigoExpense";

function IndigoExpenseRow({ indigoItemExpense }) {
  console.log(indigoItemExpense);
  const {
    id,
    indigoId,
    indigoName,
    vendorCode,
    receiver,
    shippingDate,
    shippedQuantity,
  } = indigoItemExpense;

  console.log(indigoName);

  const modifiedShippingDate = modifyDate(shippingDate);
  const { deleteIndigoExpense, isPending } = useDeleteIndigoExpense();

  return (
    <Modal>
      <Table.Row>
        <p>{indigoName}</p>
        <p>{modifiedShippingDate} г</p>
        <p>{shippedQuantity} шт.</p>
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
              deleteIndigoExpense({ id, indigoId, shippedQuantity })
            }
            disabled={isPending}
          />
        </Modal.Window>
      </Table.Row>
    </Modal>
  );
}

export default IndigoExpenseRow;
