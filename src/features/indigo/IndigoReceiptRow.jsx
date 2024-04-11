import { HiTrash } from "react-icons/hi2";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { modifyDate } from "../../helpers/modifyDate";
import { useDeleteIndigoReceipt } from "./useDeleteIndigoReceipt";
import { formatCurrency } from "../../utils/DateHelpers";

function IndigoReceiptRow({ indigoItem }) {
  const {
    id,
    indigoId,
    provider,
    orderDate,
    receiptDate,
    itemPrice,
    totalPrice,
    receivedQuantity,
    dateOfPayment,
    billNumber,
    transportCompany,
  } = indigoItem;

  const { deleteIndigoReceipt, isPending } = useDeleteIndigoReceipt();

  const modifiedReceiptDate = modifyDate(receiptDate);
  const modifiedDateOfPayment = modifyDate(dateOfPayment);
  const modifiedOrderDate = modifyDate(orderDate);

  return (
    <Modal>
      <Table.Row>
        <div>{provider}</div>
        <div>{receivedQuantity} м²</div>
        <div>{modifiedOrderDate}</div>
        <div>{modifiedDateOfPayment}</div>
        <div>{modifiedReceiptDate}</div>
        <div>{formatCurrency(itemPrice)}</div>
        <div>{formatCurrency(totalPrice)}</div>
        <div>{billNumber}</div>
        <div>{transportCompany}</div>

        <Modal.Open opens="delete-receipt-item">
          <button>
            <HiTrash />
          </button>
        </Modal.Open>
        <Modal.Window name="delete-receipt-item">
          <ConfirmDelete
            resourceName="текущее получение"
            onConfirm={() =>
              deleteIndigoReceipt({ id, indigoId, receivedQuantity })
            }
            disabled={isPending}
          />
        </Modal.Window>
      </Table.Row>
    </Modal>
  );
}

export default IndigoReceiptRow;
